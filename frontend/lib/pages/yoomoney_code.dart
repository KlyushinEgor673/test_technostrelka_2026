import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/alerts.dart';
import 'package:frontend/widgets/backend_button.dart';
import 'package:frontend/widgets/input_yoomoney.dart';
import 'package:frontend/widgets/yoomoney_button.dart';
import 'package:provider/provider.dart';

class YoomoneyCode extends StatefulWidget {
  const YoomoneyCode({super.key, required this.email});

  final String email;

  @override
  State<YoomoneyCode> createState() => _YoomoneyCodeState();
}

class _YoomoneyCodeState extends State<YoomoneyCode> {
  final _controller = TextEditingController();
  bool _isActive = false;
  late final _dio;
  final _storage = FlutterSecureStorage();
  bool _isSent = false;

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

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _dio = Provider.of<Dio>(context, listen: false);
    _controller.addListener(() {
      if (_controller.text.isNotEmpty) {
        setState(() {
          _isActive = true;
        });
      } else {
        setState(() {
          _isActive = false;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final orientation = MediaQuery.of(context).orientation;
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: MediaQuery.of(context).size.width < 540
          ? AppBar(
              backgroundColor: Colors.white,
              surfaceTintColor: Colors.white,
            )
          : null,
      body: Center(
        child: ListView(
          children: [
            Center(
              child: SizedBox(
                height: MediaQuery.of(context).size.height,
                child: Stack(
                  children: [
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Center(
                          child: Container(
                            margin: EdgeInsets.symmetric(horizontal: 20),
                            constraints: BoxConstraints(maxWidth: 500),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Text(
                                  'Введите код подтверждения',
                                  style: TextStyle(
                                    fontSize: 24,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        SizedBox(height: 15),
                        InputYoomoney(
                          controller: _controller,
                          isPassword: false,
                          hintText: 'Код',
                        ),
                        SizedBox(height: 15),
                        Container(
                          width: double.infinity,
                          constraints: BoxConstraints(
                            maxWidth: 500
                          ),
                          child: BackendButton(
                            text: 'Далее',
                            isLoading: _isSent,
                            color: Color.fromRGBO(104, 51, 235, 1),
                            onPressed: !_isActive || _isSent ? null : () async {
                              try {
                                setState(() {
                                  _isSent = true;
                                  _isActive = false;
                                });
                                String? token = await _storage.read(
                                  key: 'token',
                                );
                                await _dio.post(
                                  '/api/yoomoney/check-code-yoomoney',
                                  data: jsonEncode({
                                    'email': widget.email,
                                    'code': _controller.text,
                                  }),
                                  options: Options(
                                    headers: {
                                      'Authorization': 'Bearer $token',
                                    },
                                  ),
                                );
                                _getYoomoney(_dio);
                                _getYoomoneyChart(_dio);
                                Navigator.pushNamed(context, '/profile');
                              } on DioException catch (e) {
                                setState(() {
                                  _isSent = false;
                                  _isActive = true;
                                });
                                Alerts.showError(context, 'Неверный код');
                              }
                            },
                          ),
                        ),
                      ],
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
