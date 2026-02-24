import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:frontend/widgets/input.dart';
import 'package:google_fonts/google_fonts.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  bool _isEnter = true;

  @override
  Widget build(BuildContext context) {
    final double width = MediaQuery.of(context).size.width;
    final double height = MediaQuery.of(context).size.height;
    final _controllerEmail = TextEditingController();
    final _controllerPassword = TextEditingController();
    final _controllerName = TextEditingController();
    final _controllerSurname = TextEditingController();
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
                                onTap: _isEnter
                                    ? () {}
                                    : () {
                                        Navigator.pushNamed(context, '/otp');
                                      },
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
                              ),
                            ),
                            SizedBox(height: 15),
                            Container(
                              margin: EdgeInsets.symmetric(horizontal: 20),
                              child: Input(
                                isPassword: true,
                                hintText: 'Пароль',
                                controller: _controllerPassword,
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
                                onTap: _isEnter
                                    ? () {}
                                    : () {
                                        Navigator.pushNamed(context, '/otp');
                                      },
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
                            SizedBox(height: 38.h),
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
