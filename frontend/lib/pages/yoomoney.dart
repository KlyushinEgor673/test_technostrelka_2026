import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/widgets/input_yoomoney.dart';

class Yoomoney extends StatefulWidget {
  const Yoomoney({super.key});

  @override
  State<Yoomoney> createState() => _YoomoneyState();
}

class _YoomoneyState extends State<Yoomoney> {
  final _controllerEmail = TextEditingController();
  final _controllerPassword = TextEditingController();
  final _dio = Dio();
  final _storage = FlutterSecureStorage();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      backgroundColor: Colors.white,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            InputYoomoney(controller: _controllerEmail),
            SizedBox(height: 15),
            InputYoomoney(controller: _controllerPassword),
            SizedBox(height: 15),
            GestureDetector(
              child: Container(
                height: 42,
                margin: EdgeInsets.symmetric(horizontal: 20),
                constraints: BoxConstraints(maxWidth: 500),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  color: Color.fromRGBO(104, 51, 235, 1),
                ),
                child: Center(
                  child: Text('Далее', style: TextStyle(color: Colors.white)),
                ),
              ),
              onTap: () async {
                final token = await _storage.read(key: 'token');
                final response = await _dio.post(
                  'http://localhost:3000/api/yoomoney/enter',
                  data: jsonEncode({
                    'email': _controllerEmail.text,
                    'password': _controllerPassword.text
                  }),
                  options: Options(
                    headers: {
                      'Authorization': 'Bearer $token'
                    }
                  )
                );
                print(response.data);
              },
            ),
          ],
        ),
      ),
    );
  }
}
