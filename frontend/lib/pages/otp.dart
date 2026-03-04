import 'dart:async';
import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/alerts.dart';
import 'package:frontend/widgets/otp_box.dart';
import 'package:provider/provider.dart';

class Otp extends StatefulWidget {
  const Otp({super.key, required this.email});

  final String email;

  @override
  State<Otp> createState() => _OtpState();
}

class _OtpState extends State<Otp> {
  final _controller = TextEditingController();
  final _focusNode = FocusNode();
  int seconds = 60;
  late final _dio;
  final _storage = FlutterSecureStorage();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _dio = Provider.of<Dio>(context, listen: false);
    _focusNode.addListener(() {
      if (!_focusNode.hasFocus) {
        _focusNode.requestFocus();
      }
    });
    Timer.periodic(Duration(seconds: 1), (timer) {
      if (seconds != 0) {
        setState(() {
          seconds -= 1;
        });
      }
    });
  }


  @override
  Widget build(BuildContext context) {
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
        child: Stack(
          children: [
            Opacity(
              opacity: 0,
              child: IgnorePointer(
                ignoring: true,
                child: TextField(
                  autofocus: true,
                  keyboardType: TextInputType.number,
                  controller: _controller,
                  focusNode: _focusNode,
                  maxLength: 4,
                  inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                  onChanged: (value) {
                    setState(() {});
                  },
                ),
              ),
            ),
            Center(
              child: Container(
                margin: EdgeInsets.symmetric(horizontal: 20, vertical: 20),
                width: 400,
                height: 450,
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
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Код подтверждения',
                      style: TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    SizedBox(height: 15),
                    SizedBox(
                      width: 300,
                      child: Text(
                        'Введите код подтверждения отправленный вам на почту:',
                        style: TextStyle(color: Colors.grey, fontSize: 14),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    SizedBox(height: 15),
                    GestureDetector(
                      onTap: () {
                        _focusNode.requestFocus();
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          OtpBox(
                            text: _controller.text.length > 0
                                ? _controller.text[0]
                                : '',
                          ),
                          SizedBox(width: 10),
                          OtpBox(
                            text: _controller.text.length > 1
                                ? _controller.text[1]
                                : '',
                          ),
                          SizedBox(width: 10),
                          OtpBox(
                            text: _controller.text.length > 2
                                ? _controller.text[2]
                                : '',
                          ),
                          SizedBox(width: 10),
                          OtpBox(
                            text: _controller.text.length > 3
                                ? _controller.text[3]
                                : '',
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 60),
                    GestureDetector(
                      onTap: () async {
                        try {
                          final response = await _dio.post(
                            '/api/code/verify-code',
                            data: jsonEncode({
                              'email': widget.email,
                              'code': _controller.text,
                            }),
                          );
                          await _storage.write(
                            key: 'token',
                            value: response.data['token'],
                          );
                          Navigator.pushNamed(context, '/profile');
                        } on DioException catch (e) {
                          Alerts.showError(context, e.response?.data['error']);
                        }
                      },
                      child: IntrinsicWidth(
                        child: Container(
                          height: 50,
                          padding: EdgeInsets.symmetric(horizontal: 30),
                          constraints: BoxConstraints(minWidth: 200),
                          decoration: BoxDecoration(
                            color: Color.fromRGBO(89, 65, 174, 1),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Center(
                            child: Text(
                              'Подтвердить',
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
                    SizedBox(height: 7.5),
                    GestureDetector(
                      child: Text(
                        seconds != 0
                            ? 'Отправить код ещё раз через $seconds'
                            : 'Отправить код ещё раз',
                        style: TextStyle(color: Colors.grey, fontSize: 12),
                      ),
                      onTap: () async {
                        await _dio.post(
                          '/api/code/resend-code',
                          data: jsonEncode({'email': widget.email}),
                        );
                        setState(() {
                          seconds = 60;
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
  }
}
