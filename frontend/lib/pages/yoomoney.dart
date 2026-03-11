import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/alerts.dart';
import 'package:frontend/widgets/input_yoomoney.dart';
import 'package:frontend/widgets/yoomoney_button.dart';
import 'package:provider/provider.dart';

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

  Future<void> _getYoomoney(Dio dio) async{
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

  Future<void> _getYoomoneyChart(
      Dio dio,
      ) async {
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

  void _checkNotEmpty() {
    if (_controllerPassword.text.isNotEmpty &&
        _controllerEmail.text.isNotEmpty) {
      setState(() {
        _isNotEmpty = true;
      });
    } else {
      setState(() {
        _isNotEmpty = false;
      });
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _dio = Provider.of<Dio>(context, listen: false);
    _controllerPassword.addListener(() => _checkNotEmpty());
    _controllerEmail.addListener(() => _checkNotEmpty());
  }

  @override
  Widget build(BuildContext context) {
    final orientation = MediaQuery.of(context).orientation;
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
      ),
      backgroundColor: Colors.white,
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SizedBox(
            height: orientation == Orientation.portrait
                ? (200.h - AppBar().preferredSize.height)
                : 20,
          ),
          Center(
            child: Container(
              width: double.infinity,
              constraints: BoxConstraints(
                maxWidth: 700
              ),
              margin: EdgeInsets.symmetric(horizontal: 20),
              child: Text(
                'Вход в юMoney',
                style: TextStyle(
                  fontSize: orientation == Orientation.portrait ? 24.sp : 24,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ),
          SizedBox(height: orientation == Orientation.portrait ? 15.h : 15),
          Center(
            child: InputYoomoney(
              controller: _controllerEmail,
              isPassword: false,
              hintText: 'Email',
            ),
          ),
          SizedBox(height: orientation == Orientation.portrait ? 15.h : 15),
          Center(
            child: InputYoomoney(
              controller: _controllerPassword,
              isPassword: true,
              hintText: 'Пароль',
            ),
          ),
          SizedBox(height: 15),
          Center(
            child: YoomoneyButton(
              isCircular: _isSent,
              isActive: _isNotEmpty,
              onTap: _isNotEmpty
                  ? () async {
                      print(EmailValidator.validate(_controllerEmail.text));
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
                            options: Options(
                              headers: {'Authorization': 'Bearer $token'},
                            ),
                          );
                          if (response.data['is_enter']) {
                            _getYoomoney(_dio);
                            _getYoomoneyChart(_dio);
                            Navigator.pushNamed(context, '/profile');
                          }
                        } on DioException catch (e) {
                          if (e.response?.data['error'] ==
                              'Необходим код подтверждения') {
                            Navigator.pushNamed(
                              context,
                              '/yoomoney_code',
                              arguments: {'email': _controllerEmail.text},
                            );
                          } else {
                            Alerts.showError(
                              context,
                              'Неверный логин или пароль',
                            );
                            setState(() {
                              _isSent = false;
                              _isNotEmpty = true;
                            });
                          }
                        }
                      }
                    }
                  : () {},
            ),
          ),
        ],
      ),
    );
  }
}
