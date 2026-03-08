import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/widgets/backend_button.dart';
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
    final orientation = MediaQuery.of(context).orientation;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
      ),
      backgroundColor: Colors.white,
      body: SafeArea(
        child: ListView(
          children: [
            SizedBox(
              height: orientation == Orientation.portrait
                  ? (200.h - AppBar().preferredSize.height)
                  : 20,
            ),
            Container(
              margin: EdgeInsets.symmetric(
                horizontal: orientation == Orientation.portrait ? 20.w : 20,
              ),
              child: Text(
                'Изменение профиля',
                style: TextStyle(
                  fontSize: orientation == Orientation.portrait ? 24.sp : 24,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
            SizedBox(height: orientation == Orientation.portrait ? 15.h : 15),
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
            BackendButton(
              text: 'Изменить',
              isLoading: false,
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
            ),
          ],
        ),
      ),
    );
  }
}
