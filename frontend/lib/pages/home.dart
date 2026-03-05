import 'dart:convert';
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:frontend/alerts.dart';
import 'package:frontend/widgets/input.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:provider/provider.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

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

  Future<void> _enter() async {
    print('enter');
    if (_controllerPassword.text.isEmpty || _controllerEmail.text.isEmpty) {
      Alerts.showError(context, 'Заполните все поля');
    } else {
      try {
        final response = await _dio.post(
          '/api/user/enter',
          data: jsonEncode({
            'email': _controllerEmail.text,
            'password': _controllerPassword.text,
          }),
        );
        final data = response.data;
        await _storage.write(key: 'token', value: data['token']);
        Navigator.pushNamed(context, '/profile');
      } catch (e) {
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
    } else {
      try {
        await _dio.post(
          '/api/user/register',
          data: jsonEncode({
            'email': _controllerEmail.text,
            'password': _controllerPassword.text,
            'name': _controllerName.text,
            'surname': _controllerSurname.text,
          }),
        );
        Navigator.pushNamed(
          context,
          '/otp',
          arguments: {'email': _controllerEmail.text},
        );
      } on DioException catch (e) {
        if (e.response?.statusCode == 409) {
          Alerts.showError(context, 'Такой email уже занят');
        }
      }
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _dio = Provider.of<Dio>(context, listen: false);
  }

  @override
  Widget build(BuildContext context) {
    final orientation = MediaQuery.of(context).orientation;
    final double width = MediaQuery.of(context).size.width;
    final double height = MediaQuery.of(context).size.height;
    if (Platform.isAndroid || Platform.isIOS) {
      print(
        'width: ${MediaQuery.of(context).size.width}, height: ${MediaQuery.of(context).size.height}',
      );
      return Scaffold(
        backgroundColor: Colors.white,
        body: SafeArea(
          child: ListView(
            children: [
              SizedBox(
                height: orientation == Orientation.portrait ? 200.h : 20,
              ),
              Container(
                margin: EdgeInsets.symmetric(
                  horizontal: orientation == Orientation.portrait ? 20.w : 20,
                ),
                child: Text(
                  _isEnter ? 'Вход' : 'Регистрация',
                  style: TextStyle(
                    fontSize: orientation == Orientation.portrait ? 24.sp : 24,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
              SizedBox(height: orientation == Orientation.portrait ? 15.h : 15),
              Container(
                margin: EdgeInsets.symmetric(
                  horizontal: orientation == Orientation.portrait ? 20.w : 20,
                ),
                height: orientation == Orientation.portrait ? 50.h : 50,
                child: Input(
                  isPassword: false,
                  hintText: 'Email',
                  controller: _controllerEmail,
                  type: InputTypeCustom.inputText,
                ),
              ),
              SizedBox(height: orientation == Orientation.portrait ? 15.h : 15),
              Container(
                margin: EdgeInsets.symmetric(
                  horizontal: orientation == Orientation.portrait ? 20.w : 20,
                ),
                height: orientation == Orientation.portrait ? 50.h : 50,
                child: Input(
                  isPassword: true,
                  hintText: 'Пароль',
                  controller: _controllerPassword,
                  type: InputTypeCustom.inputText,
                ),
              ),
              if (!_isEnter) SizedBox(height: 15.h),
              if (!_isEnter)
                Container(
                  margin: EdgeInsets.symmetric(
                    horizontal: orientation == Orientation.portrait ? 20.w : 20,
                  ),
                  height: orientation == Orientation.portrait ? 50.h : 50,
                  child: Input(
                    isPassword: false,
                    hintText: 'Имя',
                    controller: _controllerName,
                    type: InputTypeCustom.inputText,
                  ),
                ),
              if (!_isEnter)
                SizedBox(
                  height: orientation == Orientation.portrait ? 15.h : 15,
                ),
              if (!_isEnter)
                Container(
                  margin: EdgeInsets.symmetric(
                    horizontal: orientation == Orientation.portrait ? 20.w : 20,
                  ),
                  height: orientation == Orientation.portrait ? 50.h : 50,
                  child: Input(
                    isPassword: false,
                    hintText: 'Фамилия',
                    controller: _controllerSurname,
                    type: InputTypeCustom.inputText,
                  ),
                ),
              SizedBox(
                height: orientation == Orientation.portrait ? 7.5.h : 7.5,
              ),
              if (_isEnter)
                Container(
                  margin: EdgeInsets.symmetric(
                    horizontal: orientation == Orientation.portrait ? 20.w : 20,
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
              SizedBox(
                height: orientation == Orientation.portrait ? 7.5.h : 7.5,
              ),
              Container(
                margin: EdgeInsets.symmetric(
                  horizontal: orientation == Orientation.portrait ? 20.w : 20,
                ),
                height: orientation == Orientation.portrait ? 50.h : 50,
                child: FilledButton(
                  onPressed: _isEnter ? _enter : _register,
                  child: Text('Далее'),
                  style: FilledButton.styleFrom(
                    backgroundColor: Color.fromRGBO(89, 65, 174, 1),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                ),
              ),
              SizedBox(height: orientation == Orientation.portrait ? 7.5.h : 7.5),
              Center(
                child: GestureDetector(
                  child: Text(
                    _isEnter ? 'Зарегистрироваться' : 'Войти',
                    style: TextStyle(
                      color: Color.fromRGBO(89, 65, 174, 1),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  onTap: () {
                    setState(() {
                      _isEnter = !_isEnter;
                    });
                  },
                ),
              ),
            ],
          ),
        ),
      );
    }
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Color.fromRGBO(225, 228, 234, 1),
              Color.fromRGBO(211, 222, 250, 1),
            ],
          ),
        ),
        child: LayoutBuilder(
          builder: (context, constrains) {
            if (constrains.maxWidth > 840 && constrains.maxHeight > 500) {
              return Center(
                child: Container(
                  width: 800,
                  height: 520,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30),
                    color: Colors.white,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withAlpha(100),
                        spreadRadius: 8,
                        blurRadius: 8,
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
                                margin: EdgeInsets.symmetric(
                                  horizontal: width * 0.03,
                                ),
                                child: Input(
                                  hintText: 'Email',
                                  isPassword: false,
                                  controller: _controllerEmail,
                                  type: InputTypeCustom.inputText,
                                ),
                              ),
                              SizedBox(height: 15),
                              Container(
                                margin: EdgeInsets.symmetric(
                                  horizontal: width * 0.03,
                                ),
                                child: Input(
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
                                    hintText: 'Фамилия',
                                    isPassword: false,
                                    controller: _controllerSurname,
                                    type: InputTypeCustom.inputText,
                                  ),
                                ),
                              if (_isEnter)
                                GestureDetector(
                                  child: Text(
                                    'Забыли ваш пароль?',
                                    style: TextStyle(color: Colors.grey),
                                  ),
                                ),
                              SizedBox(height: _isEnter ? 15 : 30),
                              GestureDetector(
                                onTap: _isEnter ? _enter : _register,
                                child: IntrinsicWidth(
                                  child: Container(
                                    height: 50,
                                    padding: EdgeInsets.symmetric(
                                      horizontal: 30,
                                    ),
                                    constraints: BoxConstraints(minWidth: 200),
                                    decoration: BoxDecoration(
                                      color: Color.fromRGBO(89, 65, 174, 1),
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    child: Center(
                                      child: Text(
                                        _isEnter
                                            ? 'Войти'
                                            : 'Зарегистрироваться',
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
                                child: IntrinsicWidth(
                                  child: Container(
                                    height: 50,
                                    padding: EdgeInsets.symmetric(
                                      horizontal: 70,
                                    ),
                                    constraints: BoxConstraints(
                                      minWidth: _isEnter ? 280 : 200,
                                    ),
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(10),
                                      border: Border.all(
                                        width: 1,
                                        color: Colors.white,
                                      ),
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
                                onTap: () {
                                  setState(() {
                                    _isEnter = !_isEnter;
                                  });
                                },
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              );
            } else {
              return Container(
                height: MediaQuery.of(context).size.height,
                margin: EdgeInsets.symmetric(vertical: 20),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Center(
                      child: Container(
                        margin: EdgeInsets.symmetric(horizontal: 20),
                        constraints: BoxConstraints(maxWidth: 500),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(30),
                          color: Colors.white,
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withAlpha(100),
                              spreadRadius: 8,
                              blurRadius: 8,
                            ),
                          ],
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              margin: EdgeInsets.only(top: 38, bottom: 20),
                              child: Center(
                                child: Text(
                                  _isEnter ? 'Вход' : 'Регистрация',
                                  style: TextStyle(
                                    fontSize: 32,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                            ),
                            Container(
                              margin: EdgeInsets.symmetric(horizontal: 20),
                              child: Input(
                                isPassword: false,
                                hintText: 'Email',
                                controller: _controllerEmail,
                                type: InputTypeCustom.inputText,
                              ),
                            ),
                            SizedBox(height: 15),
                            Container(
                              margin: EdgeInsets.symmetric(horizontal: 20),
                              child: Input(
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
                                child: Input(
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
                                child: Input(
                                  isPassword: false,
                                  hintText: 'Фамилия',
                                  controller: _controllerSurname,
                                  type: InputTypeCustom.inputText,
                                ),
                              ),
                            SizedBox(height: 7.5),
                            if (_isEnter)
                              Row(
                                mainAxisAlignment: MainAxisAlignment.end,
                                children: [
                                  Container(
                                    margin: EdgeInsets.only(right: 20),
                                    child: Text(
                                      'Восстановить',
                                      style: TextStyle(color: Colors.grey),
                                    ),
                                  ),
                                ],
                              ),
                            SizedBox(height: _isEnter ? 7.5 : 22.5),
                            Center(
                              child: GestureDetector(
                                onTap: _isEnter ? _enter : _register,
                                child: IntrinsicWidth(
                                  child: Container(
                                    height: 50,
                                    padding: EdgeInsets.symmetric(
                                      horizontal: 30,
                                    ),
                                    constraints: BoxConstraints(minWidth: 200),
                                    decoration: BoxDecoration(
                                      color: Color.fromRGBO(89, 65, 174, 1),
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    child: Center(
                                      child: Text(
                                        _isEnter
                                            ? 'Войти'
                                            : 'Зарегистрироваться',
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
                            ),
                            SizedBox(height: 12),
                            Center(
                              child: GestureDetector(
                                child: Text(
                                  _isEnter
                                      ? 'Еще не зарегистрированы?\nПройдите регистрацию →'
                                      : 'Уже есть аккаунт?\nВойдите в него →',
                                  style: TextStyle(
                                    fontWeight: FontWeight.w400,
                                    fontSize: 14,
                                    color: Color.fromRGBO(113, 113, 113, 1),
                                  ),
                                ),
                                onTap: () {
                                  setState(() {
                                    _isEnter = !_isEnter;
                                  });
                                },
                              ),
                            ),
                            SizedBox(height: 38),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              );
            }
          },
        ),
      ),
    );
  }
}
