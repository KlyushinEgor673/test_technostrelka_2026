import 'dart:async';
import 'dart:convert';
// import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/alerts.dart';
import 'package:frontend/widgets/backend_button.dart';
import 'package:frontend/widgets/box_otp.dart';
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
  bool _isLoading = false;

  Future<void> _getYoomoney(Dio dio) async {
    String? token = await _storage.read(key: 'token');
    final responseMe = await dio.get(
      '/api/user/me',
      options: Options(headers: {'authorization': 'Bearer $token'}),
    );
    if (responseMe.data['user']['is_enter_ym']) {
      final response = await dio.get('/api/yoomoney/subscription');
      await _storage.write(
        key: 'yoomoney_subscriptions',
        value: response.data['subscriptions'],
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
    final orientation = MediaQuery.of(context).orientation;
    // if (defaultTargetPlatform == TargetPlatform.android ||
    //     defaultTargetPlatform == TargetPlatform.iOS ||
    //     MediaQuery
    //         .of(context)
    //         .size
    //         .width < 750) {
    //   return Scaffold(
    //     backgroundColor: Colors.white,
    //     appBar: AppBar(
    //       backgroundColor: Colors.white,
    //       surfaceTintColor: Colors.white,
    //     ),
    //     body: ListView(
    //       children: [
    //         SizedBox(
    //           height: orientation == Orientation.portrait
    //               ? (200.h - AppBar().preferredSize.height)
    //               : 20,
    //           child: Opacity(
    //             opacity: 0,
    //             child: IgnorePointer(
    //               ignoring: true,
    //               child: TextField(
    //                 autofocus: true,
    //                 keyboardType: TextInputType.number,
    //                 controller: _controller,
    //                 focusNode: _focusNode,
    //                 maxLength: 4,
    //                 inputFormatters: [FilteringTextInputFormatter.digitsOnly],
    //                 onChanged: (value) {
    //                   setState(() {});
    //                 },
    //               ),
    //             ),
    //           ),
    //         ),
    //         Center(
    //           child: Text(
    //             'Код подтверждения',
    //             style: TextStyle(
    //               fontSize: orientation == Orientation.portrait ? 24.sp : 24,
    //               fontWeight: FontWeight.w700,
    //             ),
    //           ),
    //         ),
    //         SizedBox(height: orientation == Orientation.portrait ? 15.h : 15),
    //         GestureDetector(
    //           child: Row(
    //             mainAxisAlignment: MainAxisAlignment.center,
    //             children: [
    //               BoxOtp(
    //                 char: _controller.text.length > 0
    //                     ? _controller.text[0]
    //                     : '',
    //               ),
    //               SizedBox(width: 15),
    //               BoxOtp(
    //                 char: _controller.text.length > 1
    //                     ? _controller.text[1]
    //                     : '',
    //               ),
    //               SizedBox(width: 15),
    //               BoxOtp(
    //                 char: _controller.text.length > 2
    //                     ? _controller.text[2]
    //                     : '',
    //               ),
    //               SizedBox(width: 15),
    //               BoxOtp(
    //                 char: _controller.text.length > 3
    //                     ? _controller.text[3]
    //                     : '',
    //               ),
    //             ],
    //           ),
    //           onTap: () {
    //             _focusNode.requestFocus();
    //             SystemChannels.textInput.invokeMethod('TextInput.show');
    //           },
    //         ),
    //         SizedBox(height: orientation == Orientation.portrait ? 60.h : 60),
    //         Center(
    //           child: SizedBox(
    //             width: orientation == Orientation.portrait ? 250.w : 250,
    //             child:
    //             BackendButton(
    //               text: 'Подтвердить',
    //               isLoading: _isLoading,
    //               onPressed: () async {
    //                 try {
    //                   setState(() {
    //                     _isLoading = true;
    //                   });
    //                   print(_controller.text);
    //                   final response = await _dio.post(
    //                     '/api/code/verify-code',
    //                     data: jsonEncode({
    //                       'email': widget.email,
    //                       'code': _controller.text,
    //                     }),
    //                   );
    //                   await _storage.write(
    //                     key: 'token',
    //                     value: response.data['token'],
    //                   );
    //                   _getYoomoney(_dio);
    //                   _getYoomoneyChart(_dio);
    //                   Navigator.pushNamed(context, '/profile');
    //                 } on DioException catch (e) {
    //                   setState(() {
    //                     _isLoading = false;
    //                   });
    //                   Alerts.showError(context, e.response?.data['error']);
    //                 }
    //               },
    //             ),
    //           ),
    //         ),
    //         SizedBox(height: 7.5),
    //         Center(
    //           child: GestureDetector(
    //             onTap: seconds != 0 ? (){
    //               print('a');
    //             } : () async {
    //               await _dio.post(
    //                 '/api/code/resend-code',
    //                 data: jsonEncode({'email': widget.email}),
    //               );
    //               setState(() {
    //                 seconds = 60;
    //               });
    //             },
    //             child: Text(
    //               seconds != 0
    //                   ? 'Отправить код ещё раз через $seconds'
    //                   : 'Отправить код ещё раз',
    //               style: TextStyle(color: Colors.grey, fontSize: orientation == Orientation.portrait ? 12.sp : 12),
    //             ),
    //           ),
    //         ),
    //       ],
    //     ),
    //   );
    // }
    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
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
              // margin: EdgeInsets.symmetric(horizontal: 20, vertical: 20),
              width: 400,
              height: 450,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(30),
                color: Colors.white,
                boxShadow: MediaQuery
                    .of(context)
                    .size
                    .width > 600 ?  [
                  BoxShadow(
                    color: Color.fromRGBO(228, 232, 245, 0.6),
                    blurRadius: 20,
                  ),
                ] : null,
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Код подтверждения',
                    style: TextStyle(fontSize: 32, fontWeight: FontWeight.w700),
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
                  SizedBox(
                    width: 200,
                    child: BackendButton(
                      text: 'Подтвердить',
                      isLoading: _isLoading,
                      onPressed: () async {
                        try {
                          setState(() {
                            _isLoading = true;
                          });
                          print(_controller.text);
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
                          _getYoomoney(_dio);
                          _getYoomoneyChart(_dio);
                          Navigator.pushNamed(context, '/profile');
                        } on DioException catch (e) {
                          setState(() {
                            _isLoading = false;
                          });
                          Alerts.showError(context, e.response?.data['error']);
                        }
                      },
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
    );
  }
}
