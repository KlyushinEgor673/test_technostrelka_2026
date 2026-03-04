import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:provider/provider.dart';

import '../widgets/input.dart';

class ChangeProfile extends StatefulWidget {
  const ChangeProfile({super.key});

  @override
  State<ChangeProfile> createState() => _ChangeProfileState();
}

class _ChangeProfileState extends State<ChangeProfile> {
  final _controllerName = TextEditingController();
  final _controllerSurname = TextEditingController();
  final _storage = FlutterSecureStorage();
  late final _dio;

  Future<void> _init() async {
    String? token = await _storage.read(key: 'token');
    final response = await _dio.get(
      '/api/user/me',
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
    setState(() {
      _controllerName.text = response.data['user']['name'];
      _controllerSurname.text = response.data['user']['surname'];
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _dio = Provider.of<Dio>(context, listen: false);
    _init();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(backgroundColor: Colors.white,),
      backgroundColor: Colors.white,
      body: Center(
        child: ListView(
          children: [
            // SizedBox(height: ,)
            Container(
              margin: EdgeInsets.only(left: 20, bottom: 20),
              child: Text('Изменение профиля', style: TextStyle(fontSize: 24)),
            ),
            Container(
              margin: EdgeInsets.only(bottom: 15, left: 20, right: 20),
              constraints: BoxConstraints(maxWidth: 500),
              child: Input(
                isPassword: false,
                hintText: 'Имя',
                controller: _controllerName,
                type: InputTypeCustom.inputText,
              ),
            ),
            Container(
              margin: EdgeInsets.only(bottom: 15, left: 20, right: 20),
              constraints: BoxConstraints(maxWidth: 500),
              child: Input(
                isPassword: false,
                hintText: 'Фамилия',
                controller: _controllerSurname,
                type: InputTypeCustom.inputText,
              ),
            ),
            Container(
              margin: EdgeInsets.symmetric(horizontal: 20),
              width: double.infinity,
              height: 50,
              child: FilledButton(
                onPressed: () async {
                  String? token = await _storage.read(key: 'token');
                  await _dio.put(
                    '/api/user/edit-profile',
                    data: jsonEncode({
                      'name': _controllerName.text,
                      'surname': _controllerSurname.text,
                    }),
                    options: Options(headers: {'Authorization': 'Bearer $token'}),
                  );
                  Navigator.pop(context);
                },
                child: Text('Изменить'),
                style: FilledButton.styleFrom(
                  backgroundColor: Color.fromRGBO(89, 65, 174, 1),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
