import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/widgets/footer.dart';
import 'package:frontend/widgets/header.dart';
import 'package:provider/provider.dart';
import 'package:s_webview/s_webview.dart';
// import 'dart:html' as html;

class Profile extends StatefulWidget {
  const Profile({super.key});

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  late final _dio;
  final _storage = FlutterSecureStorage();

  String _name = '';
  String _surname = '';
  String _email = '';
  bool _isEnterYm = true;

  Future<void> _init() async {
    String? token = await _storage.read(key: 'token');
    final response = await _dio.get(
      '/api/user/me',
      options: Options(headers: {'authorization': 'Bearer $token'}),
    );
    final data = response.data['user'];
    setState(() {
      _name = data['name'];
      _surname = data['surname'];
      _email = data['email'];
      _isEnterYm = data['is_enter_ym'];
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
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Header(id: 1),
            SizedBox(height: 35),
            Container(
              margin: EdgeInsets.only(left: 20),
              child: Text(
                '$_name $_surname',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700),
              ),
            ),
            Container(
              margin: EdgeInsets.only(left: 20, top: 8),
              child: Text(_email, style: TextStyle(fontSize: 16)),
            ),
            Spacer(),
            Center(
              child: GestureDetector(
                child: Container(
                  width: 200,
                  height: 40,
                  decoration: BoxDecoration(
                    color: _isEnterYm
                        ? Colors.white
                        : Color.fromRGBO(104, 51, 235, 1),
                    borderRadius: BorderRadius.circular(10),
                    border: _isEnterYm
                        ? Border.all(
                            width: 2,
                            color: Color.fromRGBO(104, 51, 235, 1),
                          )
                        : null,
                  ),
                  child: Center(
                    child: !_isEnterYm
                        ? Text(
                            'Подключить юMoney',
                            style: TextStyle(color: Colors.white),
                          )
                        : Text(
                            'Отключить юMoney',
                            style: TextStyle(
                              color: Color.fromRGBO(104, 51, 235, 1),
                            ),
                          ),
                  ),
                ),
                onTap: _isEnterYm
                    ? () async {
                        String? token = await _storage.read(key: 'token');
                        await _dio.delete(
                          '/api/yoomoney/logout',
                          options: Options(
                            headers: {'Authorization': 'Bearer $token'},
                          ),
                        );
                        setState(() {
                          _isEnterYm = false;
                        });
                      }
                    : () {
                        Navigator.pushNamed(context, '/yoomoney');
                      },
              ),
            ),
            Center(
              child: TextButton(
                onPressed: () async {
                  await Navigator.pushNamed(context, '/change_profile');
                  await _init();
                },
                child: Text('Изменить профиль'),
              ),
            ),
            Center(
              child: TextButton(
                style: TextButton.styleFrom(foregroundColor: Colors.red),
                onPressed: () async {
                  await _storage.delete(key: 'token');
                  Navigator.pushNamed(context, '/entrance');
                },
                child: Text('Выйти'),
              ),
            ),
            Spacer(),
          ],
        ),
      ),
      bottomNavigationBar: Footer(currentIndex: 2),
    );
  }
}
