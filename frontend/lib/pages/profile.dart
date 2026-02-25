import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:html' as html;

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
    print(data);
    setState(() {
      _name = data['name'];
      _surname = data['surname'];
      _email = data['email'];
    });
    if (Uri.base.queryParameters.containsKey('code')) {
      final dio = Dio();
      String? token = await _storage.read(key: 'token');
      final response = await dio.post(
        'http://localhost:3000/api/exchange-token',
        data: {'code': Uri.base.queryParameters['code']},
        options: Options(headers: {'authorization': 'Bearer $token'}),
      );

      print(response.data);
    }
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
      body: Column(
        children: [
          Text(_name),
          Text(_surname),
          Text(_email),
          FilledButton(
            onPressed: () {
              final url = Uri.parse(
                'https://yoomoney.ru/oauth/authorize?'
                'client_id=6EFCC0255452172DD4C176A7429F2D4F71AFDE69F3EEAA18DFCCA727903F01F2'
                '&response_type=code'
                '&redirect_uri=https://localhost.ru:8080'
                '&scope=account-info%20operation-history%20operation-details%20incoming-transfers%20payment-p2p%20payment-shop',
              );
              html.window.location.href = url.toString();
            },
            child: Text('Подключить youmoney'),
          ),
          TextButton(onPressed: () async {
            await _storage.delete(key: 'token');
            Navigator.pushNamed(context, '/entrance');
          }, child: Text('Выйти'))
        ],
      ),
    );
  }
}
