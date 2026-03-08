import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/alerts.dart';
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
      appBar: AppBar(backgroundColor: Colors.white),
      body: Center(
        child: Column(
          children: [
            SizedBox(
              height: orientation == Orientation.portrait
                  ? (200.h - AppBar().preferredSize.height)
                  : 20,
            ),
            Container(
              margin: EdgeInsets.symmetric(horizontal: 20),
              child: Text(
                'Введите код подтверждения',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700),
              ),
            ),
            SizedBox(height: 15),
            InputYoomoney(controller: _controller, isPassword: false, hintText: 'Код',),
            SizedBox(height: 15),
            YoomoneyButton(
              isCircular: _isSent,
              isActive: _isActive,
              onTap: _isActive
                  ? () async {
                      try {
                        setState(() {
                          _isSent = true;
                          _isActive = false;
                        });
                        String? token = await _storage.read(key: 'token');
                        await _dio.post(
                          '/api/yoomoney/check-code-yoomoney',
                          data: jsonEncode({
                            'email': widget.email,
                            'code': _controller.text,
                          }),
                          options: Options(
                            headers: {'Authorization': 'Bearer $token'},
                          ),
                        );
                        Navigator.pushNamed(context, '/profile');
                      } on DioException catch (e) {
                        setState(() {
                          _isSent = false;
                          _isActive = true;
                        });
                        Alerts.showError(context, 'Неверный код');
                      }
                    }
                  : () {},
            ),
          ],
        ),
      ),
    );
  }
}
