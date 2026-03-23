import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/alerts.dart';
import 'package:provider/provider.dart';

import '../widgets/backend_button.dart';
import '../widgets/input.dart';

class ChangePassword extends StatefulWidget {
  const ChangePassword({super.key});

  @override
  State<ChangePassword> createState() => _ChangePasswordState();
}

class _ChangePasswordState extends State<ChangePassword> {
  bool _isLoading = false;
  bool _isCan = false;
  final _controllerOldPassword = TextEditingController();
  final _controllerNewPassword = TextEditingController();
  late final _dio;
  final _storage = FlutterSecureStorage();

  Map _checkPassword(String password) {
    if (password.length < 8) {
      return {'status': false, 'detail': 'Пароль слишком короткий'};
    } else if (!password.contains(RegExp('[A-Z]'))) {
      return {'status': false, 'detail': 'В пароле должна быть большая буква'};
    } else if (!password.contains(RegExp('[0-9]'))) {
      return {'status': false, 'detail': 'В пароле должна быть цифра'};
    } else if (!password.contains(RegExp('[!@#\$%^&*]'))) {
      return {
        'status': false,
        'detail': 'В пароле должен быть специальный символ',
      };
    }
    return {'status': true};
  }

  void _changePassword() async {
    final resPassword = _checkPassword(_controllerNewPassword.text);
    if (!resPassword['status']){
      Alerts.showError(context, resPassword['detail']);
    } else {
      String? token = await _storage.read(key: 'token');
      try {
        await _dio.put(
          '/api/user/edit-password',
          data: jsonEncode({
            'oldPassword': _controllerOldPassword.text,
            'newPassword': _controllerNewPassword.text
          }),
          options: Options(headers: {'Authorization': 'Bearer ${token}'}),
        );
        Navigator.pop(context);
      } on DioException catch (e) {
        Alerts.showError(context, e.response?.data['error']);
      }
    }
  }

  void _checkCan() {
    if (_controllerOldPassword.text.isNotEmpty &&
        _controllerNewPassword.text.isNotEmpty) {
      setState(() {
        _isCan = true;
      });
    } else {
      setState(() {
        _isCan = false;
      });
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _controllerOldPassword.addListener(() => _checkCan());
    _controllerNewPassword.addListener(() => _checkCan());
    _dio = Provider.of<Dio>(context, listen: false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: MediaQuery.of(context).size.width < 540
          ? AppBar(
              backgroundColor: Colors.white,
              surfaceTintColor: Colors.white,
            )
          : null,
      body: SafeArea(
        child: ListView(
          children: [
            SizedBox(
              height:
                  MediaQuery.of(context).size.height -
                  AppBar().preferredSize.height -
                  MediaQuery.of(context).padding.top -
                  MediaQuery.of(context).padding.bottom,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Center(
                    child: Container(
                      constraints: BoxConstraints(maxWidth: 500),
                      margin: EdgeInsets.symmetric(horizontal: 20),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Text(
                            'Изменение пароля',
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
                  Center(
                    child: Container(
                      margin: EdgeInsets.only(bottom: 15, left: 20, right: 20),
                      constraints: BoxConstraints(maxWidth: 500),
                      child: Input(
                        readOnly: _isLoading,
                        isPassword: true,
                        hintText: 'Старый пароль',
                        controller: _controllerOldPassword,
                        type: InputTypeCustom.inputText,
                      ),
                    ),
                  ),
                  Center(
                    child: Container(
                      margin: EdgeInsets.only(bottom: 15, left: 20, right: 20),
                      constraints: BoxConstraints(maxWidth: 500),
                      child: Input(
                        readOnly: _isLoading,
                        isPassword: true,
                        hintText: 'Новый пароль',
                        controller: _controllerNewPassword,
                        type: InputTypeCustom.inputDouble,
                      ),
                    ),
                  ),
                  if (MediaQuery.of(context).size.width > 540)
                    Center(
                      child: Container(
                        margin: EdgeInsets.only(
                          bottom: 15,
                          left: 20,
                          right: 20,
                        ),
                        width: double.infinity,
                        constraints: BoxConstraints(maxWidth: 500),
                        child: Row(
                          spacing: 10,
                          children: [
                            GestureDetector(
                              child: Container(
                                // margin:  MediaQuery.of(context).size.width > 540 ? EdgeInsets.only(
                                //   right: 20,
                                // ) : null,
                                width: 245,
                                height: 50,
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(10),
                                  border: Border.all(
                                    color: Color.fromRGBO(89, 65, 174, 1),
                                    width: 2.5,
                                  ),
                                ),
                                child: Center(
                                  child: Text(
                                    'Отменить',
                                    style: TextStyle(
                                      color: Color.fromRGBO(89, 65, 174, 1),
                                      fontSize: 16,
                                    ),
                                  ),
                                ),
                              ),
                              onTap: () {
                                Navigator.pop(context);
                              },
                            ),
                            Container(
                              width: 245,
                              constraints: BoxConstraints(maxWidth: 500),
                              child: BackendButton(
                                color: Color.fromRGBO(89, 65, 174, 1),
                                text: 'Изменить',
                                isLoading: _isLoading,
                                onPressed: !_isCan || _isLoading
                                    ? null
                                    : _changePassword,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  if (MediaQuery.of(context).size.width < 540)
                    Container(
                      width: double.infinity,
                      constraints: BoxConstraints(maxWidth: 500),
                      margin: EdgeInsets.only(bottom: 15, left: 20, right: 20),
                      child: BackendButton(
                        color: Color.fromRGBO(89, 65, 174, 1),
                        text: 'Изменить',
                        isLoading: _isLoading,
                        onPressed: !_isCan || _isLoading
                            ? null
                            : _changePassword,
                      ),
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
