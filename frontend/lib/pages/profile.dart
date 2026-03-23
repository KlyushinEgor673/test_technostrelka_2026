import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/widgets/footer.dart';
import 'package:frontend/widgets/header.dart';
import 'package:provider/provider.dart';

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
  void dispose() {
    // Если забыли вызвать _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final orientation = MediaQuery.of(context).orientation;
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: Header(id: 3),
      body: SafeArea(
        child: Center(
          child: Container(
            padding: EdgeInsets.all(35),
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(30),
              color: Colors.white,
                boxShadow:MediaQuery
                    .of(context)
                    .size
                    .width > 840 ?  [
                  BoxShadow(
                    color: Color.fromRGBO(228, 232, 245, 0.6),
                    blurRadius: 20,
                  ),
                ] : null
            ),
            child: IntrinsicHeight(
              child: Column(
                children: [
                  // SizedBox(height: 35),
                  Text(
                    '$_name $_surname',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700),
                  ),
                  SizedBox(height: 5,),
                  Text(_email, style: TextStyle(fontSize: 16)),
                  SizedBox(height: 5,),
                  GestureDetector(
                    onTap: _isEnterYm
                        ? () async {
                      await _storage.delete(key: 'yoomoney_subscriptions');
                      await _storage.delete(key: 'yoomoneyChart');
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
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                          ),
                        )
                            : Text(
                          'Отключить юMoney',
                          style: TextStyle(
                            color: Color.fromRGBO(104, 51, 235, 1),
                            fontSize: 16,
                          ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 5,),
                  TextButton(
                    onPressed: () async {
                      await Navigator.pushNamed(context, '/change_profile');
                      await _init();
                    },
                    child: Text(
                      'Изменить профиль',
                      style: TextStyle(fontSize: 16),
                    ),
                  ),
                  SizedBox(height: 5,),
                  TextButton(
                    style: TextButton.styleFrom(foregroundColor: Colors.red),
                    onPressed: () async {
                      await _storage.delete(key: 'token');
                      await _storage.delete(key: 'yoomoney_subscriptions');
                      await _storage.delete(key: 'yoomoneyChart');
                      Navigator.pushNamed(context, '/entrance');
                    },
                    child: Text('Выйти', style: TextStyle(fontSize: 16)),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
      bottomNavigationBar: SafeArea(child: Footer(currentIndex: 3)),
    );
  }
}
