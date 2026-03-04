import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/widgets/header.dart';
// import 'dart:html' as html;

class Profile extends StatefulWidget {
  const Profile({super.key});

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  final _dio = Dio();
  final _storage = FlutterSecureStorage();

  String _name = '';
  String _surname = '';
  String _email = '';

  Future<void> _init() async {
    String? token = await _storage.read(key: 'token');
    final response = await _dio.get(
      'http://localhost:3000/api/user/me',
      options: Options(headers: {'authorization': 'Bearer $token'}),
    );
    final data = response.data['user'];
    setState(() {
      _name = data['name'];
      _surname = data['surname'];
      _email = data['email'];
    });
    // if (Uri.base.queryParameters.containsKey('code')) {
    //   final dio = Dio();
    //   String? token = await _storage.read(key: 'token');
    //   final response = await dio.post(
    //     'http://localhost:3000/api/exchange-token',
    //     data: {'code': Uri.base.queryParameters['code']},
    //     options: Options(headers: {'authorization': 'Bearer $token'}),
    //   );
    //   final res = await _dio.post('http://localhost:3000/api/operation-history',
    //     options: Options(headers: {'authorization': 'Bearer $token'}),);
    //   print(res);
    //   final res2 = await _dio.post('http://localhost:3000/api/operation-details',
    //     data: jsonEncode({'operation_id': '825023305515984084'}),
    //     options: Options(headers: {'authorization': 'Bearer $token'}),);
    //   print(res2);
    // }
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _init();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(
          child: Column(
            children: [
              Header(id: 1),
              Spacer(),
              Text(_name),
              Text(_surname),
              Text(_email),
              FilledButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/yoomoney');
                },
                child: Text('Подключить youmoney'),
              ),
              TextButton(
                onPressed: () async {
                  await Navigator.pushNamed(context, '/change_profile');
                  await _init();
                },
                child: Text('Изменить профиль'),
              ),
              TextButton(
                onPressed: () async {
                  await _storage.delete(key: 'token');
                  Navigator.pushNamed(context, '/entrance');
                },
                child: Text('Выйти'),
              ),
              Spacer(),
            ],
          ),
        ),
      ),
    );
  }
}
