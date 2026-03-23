import 'dart:convert';
import 'package:flutter/foundation.dart';

import 'package:dio/dio.dart';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:frontend/alerts.dart';
import 'package:frontend/widgets/backend_button.dart';
import 'package:frontend/widgets/input.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:provider/provider.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  bool _isEnter = true;
  final _controllerEmail = TextEditingController();
  final _controllerPassword = TextEditingController();
  final _controllerName = TextEditingController();
  final _controllerSurname = TextEditingController();

  late final _dio;
  final _storage = FlutterSecureStorage();
  bool _isLoading = false;
  bool _isCan = false;

  void _checkCan() {
    if (_controllerName.text.isNotEmpty &&
        _controllerSurname.text.isNotEmpty &&
        _controllerEmail.text.isNotEmpty &&
        _controllerPassword.text.isNotEmpty &&
        _isEnter == false) {
      setState(() {
        _isCan = true;
      });
    } else if (_isEnter &&
        _controllerEmail.text.isNotEmpty &&
        _controllerPassword.text.isNotEmpty) {
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
    final responseMe = await dio.get(
      '/api/user/me',
      options: Options(headers: {'authorization': 'Bearer $token'}),
    );
    if (responseMe.data['user']['is_enter_ym']) {
      final response = await dio.get(
        '/api/yoomoney/subscription',
        options: Options(headers: {'authorization': 'Bearer $token'}),
      );
      print(response.data);
      await _storage.write(
        key: 'yoomoney_subscriptions',
        value: jsonEncode(response.data['subscriptions']),
      );
    }
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

  Map _checkPassword(String password) {
    if (password.length < 8) {
      return {'status': false, 'detail': 'Пароль слишком короткий'};
    } else if (!password.contains(RegExp('[A-Z]'))) {
      return {'status': false, 'detail': 'В пароле должна быть большая буква'};
    } else if (!password.contains(RegExp('[0-9]'))) {
      return {'status': false, 'detail': 'В пароле должна быть цифра'};
    } else if (!password.contains(RegExp('[!@#\$%^&*]'))) {
      return {
        'status': false,
        'detail': 'В пароле должен быть специальный символ',
      };
    }
    return {'status': true};
  }

  Future<void> _enter() async {
    if (_controllerPassword.text.isEmpty || _controllerEmail.text.isEmpty) {
      Alerts.showError(context, 'Заполните все поля');
    } else {
      try {
        setState(() {
          _isLoading = true;
        });
        final response = await _dio.post(
          '/api/user/enter',
          data: jsonEncode({
            'email': _controllerEmail.text,
            'password': _controllerPassword.text,
          }),
        );
        final data = response.data;
        await _storage.write(key: 'token', value: data['token']);
        _getYoomoney(_dio);
        _getYoomoneyChart(_dio);
        Navigator.pushNamed(context, '/profile');
      } catch (e) {
        setState(() {
          _isLoading = false;
        });
        Alerts.showError(context, 'Неверный логин или пароль');
      }
    }
  }

  Future<void> _register() async {
    if (_controllerPassword.text.isEmpty ||
        _controllerEmail.text.isEmpty ||
        _controllerName.text.isEmpty ||
        _controllerSurname.text.isEmpty) {
      Alerts.showError(context, 'Заполните все поля');
    } else if (!EmailValidator.validate(_controllerEmail.text)) {
      Alerts.showError(context, 'Введите коректный email');
    } else if (!_checkPassword(_controllerPassword.text)['status']) {
      Alerts.showError(
        context,
        _checkPassword(_controllerPassword.text)['detail'],
      );
    } else {
      try {
        setState(() {
          _isLoading = true;
        });
        await _dio.post(
          '/api/user/register',
          data: jsonEncode({
            'email': _controllerEmail.text,
            'password': _controllerPassword.text,
            'name': _controllerName.text,
            'surname': _controllerSurname.text,
          }),
        );
        print('b');
        await Navigator.pushNamed(
          context,
          '/otp',
          arguments: {'email': _controllerEmail.text},
        );
        setState(() {
          _isLoading = false;
        });
      } on DioException catch (e) {
        setState(() {
          _isLoading = false;
        });
        if (e.response?.statusCode == 409) {
          Alerts.showError(context, 'Такой email уже занят');
        }
        rethrow;
      }
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _dio = Provider.of<Dio>(context, listen: false);
    _controllerEmail.addListener(() => _checkCan());
    _controllerPassword.addListener(() => _checkCan());
    _controllerName.addListener(() => _checkCan());
    _controllerSurname.addListener(() => _checkCan());
  }

  @override
  Widget build(BuildContext context) {
    final orientation = MediaQuery.of(context).orientation;
    final double width = MediaQuery.of(context).size.width;
    final double height = MediaQuery.of(context).size.height;
    if (defaultTargetPlatform == TargetPlatform.android ||
        defaultTargetPlatform == TargetPlatform.iOS ||
        MediaQuery.of(context).size.width < 840) {
      return Scaffold(
        backgroundColor: Colors.white,
        body: SafeArea(
          child: ListView(
            children: [
              Container(
                height:
                    MediaQuery.of(context).size.height -
                    MediaQuery.of(context).padding.top -
                    MediaQuery.of(context).padding.bottom,
                // color: Colors.green,
                child: Stack(
                  children: [
                    Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            margin: EdgeInsets.symmetric(horizontal: 20),
                            constraints: BoxConstraints(
                              maxWidth: 500
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Text(
                                  _isEnter ? 'Вход' : 'Регистрация',
                                  style: TextStyle(
                                    fontSize: 24,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SizedBox(height: 15),
                          Container(
                            margin: EdgeInsets.symmetric(horizontal: 20),
                            height: 50,
                            child: Input(
                              readOnly: _isLoading,
                              isPassword: false,
                              hintText: 'Email',
                              controller: _controllerEmail,
                              type: InputTypeCustom.inputText,
                            ),
                          ),
                          SizedBox(height: 15),
                          Container(
                            margin: EdgeInsets.symmetric(horizontal: 20),
                            height: 50,
                            child: Input(
                              readOnly: _isLoading,
                              isPassword: true,
                              hintText: 'Пароль',
                              controller: _controllerPassword,
                              type: InputTypeCustom.inputText,
                            ),
                          ),
                          if (!_isEnter) SizedBox(height: 15),
                          if (!_isEnter)
                            Container(
                              margin: EdgeInsets.symmetric(horizontal: 20),
                              height: 50,
                              child: Input(
                                readOnly: _isLoading,
                                isPassword: false,
                                hintText: 'Имя',
                                controller: _controllerName,
                                type: InputTypeCustom.inputText,
                              ),
                            ),
                          if (!_isEnter) SizedBox(height: 15),
                          if (!_isEnter)
                            Container(
                              margin: EdgeInsets.symmetric(horizontal: 20),
                              height: 50,
                              child: Input(
                                readOnly: _isLoading,
                                isPassword: false,
                                hintText: 'Фамилия',
                                controller: _controllerSurname,
                                type: InputTypeCustom.inputText,
                              ),
                            ),
                          SizedBox(height: 7.5),
                          if (_isEnter)
                            Container(
                              margin: EdgeInsets.symmetric(horizontal: 20),
                              constraints: BoxConstraints(
                                maxWidth: 500
                              ),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.end,
                                children: [
                                  GestureDetector(
                                    child: Text(
                                      'Восстановить',
                                      style: TextStyle(
                                        color: Color.fromRGBO(89, 65, 174, 1),
                                        fontWeight: FontWeight.w500,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          SizedBox(height: 7.5),
                          Container(
                            margin: EdgeInsets.symmetric(horizontal: 20),
                            width: double.infinity,
                            constraints: BoxConstraints(
                              maxWidth: 500
                            ),
                            child: BackendButton(
                              text: 'Далее',
                              isLoading: _isLoading,
                              onPressed: !_isCan || _isLoading
                                  ? null
                                  : _isEnter
                                  ? _enter
                                  : _register,
                              color: Color.fromRGBO(89, 65, 174, 1),
                            ),
                          ),
                          SizedBox(height: 7.5),
                          Center(
                            child: GestureDetector(
                              child: Text(
                                _isEnter ? 'Зарегистрироваться' : 'Войти',
                                style: TextStyle(
                                  color: Color.fromRGBO(89, 65, 174, 1),
                                  fontWeight: FontWeight.w500,
                                  fontSize: 12,
                                ),
                              ),
                              onTap: () {
                                setState(() {
                                  _isEnter = !_isEnter;
                                });
                                _checkCan();
                              },
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      );
    }
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          width: 800,
          height: 520,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(30),
            color: Colors.white,
            boxShadow: [
              BoxShadow(
                color: Color.fromRGBO(228, 232, 245, 0.6),
                blurRadius: 20,
              ),
            ],
          ),
          child: Stack(
            children: [
              AnimatedPositioned(
                left: _isEnter ? 0 : 800 - (800 * 0.55),
                top: 0,
                duration: Duration(milliseconds: 300),
                child: SizedBox(
                  width: 800 * 0.55,
                  height: 520,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        _isEnter ? 'Вход' : 'Регистрация',
                        style: TextStyle(
                          fontSize: 32,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      SizedBox(height: 15),
                      Container(
                        margin: EdgeInsets.symmetric(horizontal: width * 0.03),
                        child: Input(
                          readOnly: _isLoading,
                          hintText: 'Email',
                          isPassword: false,
                          controller: _controllerEmail,
                          type: InputTypeCustom.inputText,
                        ),
                      ),
                      SizedBox(height: 15),
                      Container(
                        margin: EdgeInsets.symmetric(horizontal: width * 0.03),
                        child: Input(
                          readOnly: _isLoading,
                          hintText: 'Пароль',
                          isPassword: true,
                          controller: _controllerPassword,
                          type: InputTypeCustom.inputText,
                        ),
                      ),
                      SizedBox(height: 15),
                      if (!_isEnter)
                        Container(
                          margin: EdgeInsets.symmetric(
                            horizontal: width * 0.03,
                          ),
                          child: Input(
                            readOnly: _isLoading,
                            hintText: 'Имя',
                            isPassword: false,
                            controller: _controllerName,
                            type: InputTypeCustom.inputText,
                          ),
                        ),
                      if (!_isEnter) SizedBox(height: 15),
                      if (!_isEnter)
                        Container(
                          margin: EdgeInsets.symmetric(
                            horizontal: width * 0.03,
                          ),
                          child: Input(
                            readOnly: _isLoading,
                            hintText: 'Фамилия',
                            isPassword: false,
                            controller: _controllerSurname,
                            type: InputTypeCustom.inputText,
                          ),
                        ),
                      SizedBox(height: _isEnter ? 0 : 15),
                      Container(
                        margin: EdgeInsets.symmetric(horizontal: width * 0.03),
                        width: double.infinity,
                        child: BackendButton(
                          text: 'Далее',
                          isLoading: _isLoading,
                          onPressed: !_isCan || _isLoading
                              ? null
                              : _isEnter
                              ? _enter
                              : _register,
                          color: Color.fromRGBO(89, 65, 174, 1),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              AnimatedPositioned(
                left: _isEnter ? 800 - (800 * 0.45) : 0,
                top: 0,
                duration: Duration(milliseconds: 300),
                child: Container(
                  width: 800 * 0.45,
                  height: 520,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(_isEnter ? 100 : 30),
                      bottomLeft: Radius.circular(_isEnter ? 100 : 30),
                      topRight: Radius.circular(_isEnter ? 30 : 100),
                      bottomRight: Radius.circular(_isEnter ? 30 : 100),
                    ),
                    gradient: LinearGradient(
                      colors: [
                        Color.fromRGBO(97, 93, 186, 1),
                        Color.fromRGBO(89, 65, 174, 1),
                      ],
                    ),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Привет!',
                        style: TextStyle(
                          fontSize: 44,
                          color: Colors.white,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      SizedBox(height: 15),
                      Text(
                        textAlign: TextAlign.center,
                        _isEnter
                            ? 'Еще не зарегистрированы? Пройдите регистрацию →'
                            : 'Уже есть аккаунт? Войдите в него →',
                        style: TextStyle(
                          fontSize: 16,
                          color: Colors.white,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      SizedBox(height: 15),
                      GestureDetector(
                        onTap: _isLoading
                            ? null
                            : () {
                                setState(() {
                                  _isEnter = !_isEnter;
                                });
                                _checkCan();
                              },
                        child: IntrinsicWidth(
                          child: Container(
                            height: 50,
                            padding: EdgeInsets.symmetric(horizontal: 70),
                            constraints: BoxConstraints(
                              minWidth: _isEnter ? 280 : 200,
                            ),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(width: 1, color: Colors.white),
                            ),
                            child: Center(
                              child: Text(
                                _isEnter ? 'Регистрация' : 'Вход',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w600,
                                  fontSize: 20,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
