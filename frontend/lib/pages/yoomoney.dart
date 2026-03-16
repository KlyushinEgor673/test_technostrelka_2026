import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/alerts.dart';
import 'package:frontend/widgets/input_yoomoney.dart';
import 'package:frontend/widgets/yoomoney_button.dart';
import 'package:provider/provider.dart';

import '../widgets/backend_button.dart';

class Yoomoney extends StatefulWidget {
  const Yoomoney({super.key});

  @override
  State<Yoomoney> createState() => _YoomoneyState();
}

class _YoomoneyState extends State<Yoomoney> {
  final _controllerEmail = TextEditingController();
  final _controllerPassword = TextEditingController();
  late final _dio;
  final _storage = FlutterSecureStorage();
  bool _isNotEmpty = false;
  bool _isSent = false;
  bool _isCan = false;
  bool _isDropdown = false;

  void _checkCan() {
    if (_controllerEmail.text.isNotEmpty &&
        _controllerPassword.text.isNotEmpty &&
        _isDropdown) {
      setState(() {
        _isCan = true;
      });
    } else {
      setState(() {
        _isCan = false;
      });
    }
  }

  Future<void> _getYoomoney(Dio dio) async {
    String? token = await _storage.read(key: 'token');
    final response = await dio.get(
      '/api/yoomoney/subscription',
      options: Options(headers: {'authorization': 'Bearer $token'}),
    );
    await _storage.write(
      key: 'yoomoney_subscriptions',
      value: jsonEncode(response.data['subscriptions']),
    );
    print('ЗАПИСАНО');
  }

  Future<void> _getYoomoneyChart(Dio dio) async {
    String? token = await _storage.read(key: 'token');
    final response = await dio.get(
      '/api/graphs/graphsYoomoneySubs',
      options: Options(headers: {'authorization': 'Bearer $token'}),
    );
    await _storage.write(
      key: 'yoomoneyChart',
      value: jsonEncode(response.data['subs']),
    );
  }

  Future<void> _entrance() async {
    if (!EmailValidator.validate(_controllerEmail.text)) {
      Alerts.showError(context, 'Введите коректный email');
    } else {
      setState(() {
        _isSent = true;
        _isNotEmpty = false;
      });
      final token = await _storage.read(key: 'token');
      try {
        final response = await _dio.post(
          '/api/yoomoney/enter',
          data: jsonEncode({
            'email': _controllerEmail.text,
            'password': _controllerPassword.text,
          }),
          options: Options(headers: {'Authorization': 'Bearer $token'}),
        );
        if (response.data['is_enter']) {
          _getYoomoney(_dio);
          _getYoomoneyChart(_dio);
          Navigator.pushNamed(context, '/profile');
        }
      } on DioException catch (e) {
        if (e.response?.data['error'] == 'Необходим код подтверждения') {
          await Navigator.pushNamed(
            context,
            '/yoomoney_code',
            arguments: {'email': _controllerEmail.text},
          );
          setState(() {
            _isSent = false;
          });
        } else {
          Alerts.showError(context, 'Неверный логин или пароль');
          setState(() {
            _isSent = false;
            _isNotEmpty = true;
          });
        }
      }
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _dio = Provider.of<Dio>(context, listen: false);
    _controllerPassword.addListener(() => _checkCan());
    _controllerEmail.addListener(() => _checkCan());
  }

  @override
  Widget build(BuildContext context) {
    final orientation = MediaQuery.of(context).orientation;
    return Scaffold(
      appBar: MediaQuery.of(context).size.width < 540
          ? AppBar(
              backgroundColor: Colors.white,
              surfaceTintColor: Colors.white,
            )
          : null,
      backgroundColor: Colors.white,
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Center(
            child: Container(
              width: double.infinity,
              constraints: BoxConstraints(maxWidth: 500),
              margin: EdgeInsets.symmetric(horizontal: 20),
              child: Text(
                'Вход в юMoney',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700),
              ),
            ),
          ),
          SizedBox(height: 15),
          Center(
            child: InputYoomoney(
              controller: _controllerEmail,
              isPassword: false,
              hintText: 'Email',
            ),
          ),
          SizedBox(height: 15),
          Center(
            child: InputYoomoney(
              controller: _controllerPassword,
              isPassword: true,
              hintText: 'Пароль',
            ),
          ),
          SizedBox(height: 7.5),
          Container(
            constraints: BoxConstraints(maxWidth: 500),
            margin: EdgeInsets.symmetric(horizontal: 20),
            child: Row(
              children: [
                Checkbox(
                  activeColor: Color.fromRGBO(104, 51, 235, 1),
                  value: _isDropdown,
                  onChanged: (newValue) {
                    setState(() {
                      _isDropdown = !_isDropdown;
                    });
                    _checkCan();
                  },
                ),
                Text('Даю согласие на обработку персональных данных'),
              ],
            ),
          ),
          SizedBox(height: 7.5),
          if (MediaQuery.of(context).size.width > 540)
            Center(
              child: Container(
                margin: EdgeInsets.only(bottom: 15, left: 20, right: 20),
                width: double.infinity,
                constraints: BoxConstraints(maxWidth: 500),
                child: Row(
                  spacing: 10,
                  children: [
                    GestureDetector(
                      child: Container(
                        // margin:  MediaQuery.of(context).size.width > 540 ? EdgeInsets.only(
                        //   right: 20,
                        // ) : null,
                        width: 245,
                        height: 50,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            color: Color.fromRGBO(104, 51, 235, 1),
                            width: 2.5,
                          ),
                        ),
                        child: Center(
                          child: Text(
                            'Отменить',
                            style: TextStyle(
                              color: Color.fromRGBO(104, 51, 235, 1),
                              fontSize: 16,
                            ),
                          ),
                        ),
                      ),
                      onTap: () {
                        Navigator.pop(context);
                      },
                    ),
                    Container(
                      width: 245,
                      constraints: BoxConstraints(maxWidth: 500),
                      child: BackendButton(
                        color: Color.fromRGBO(104, 51, 235, 1),
                        text: 'Далее',
                        isLoading: _isSent,
                        onPressed: !_isCan || _isSent ? null : _entrance,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          if (MediaQuery.of(context).size.width < 540)
            Container(
              width: double.infinity,
              constraints: BoxConstraints(maxWidth: 500),
              margin: EdgeInsets.only(bottom: 15, left: 20, right: 20),
              child: BackendButton(
                color: Color.fromRGBO(104, 51, 235, 1),
                text: 'Далее',
                isLoading: _isSent,
                onPressed: !_isCan || _isSent ? null : _entrance,
              ),
            ),
        ],
      ),
    );
  }
}
