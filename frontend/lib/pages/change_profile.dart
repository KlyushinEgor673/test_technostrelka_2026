import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
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
      appBar: MediaQuery.of(context).size.width < 540
          ? AppBar(
              backgroundColor: Colors.white,
              surfaceTintColor: Colors.white,
            )
          : null,
      backgroundColor: Colors.white,
      body: SafeArea(
        child: ListView(
          children: [
            SizedBox(
              child: Stack(
                children: [
                  SizedBox(
                    height:
                        MediaQuery.of(context).size.height -
                        AppBar().preferredSize.height,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Center(
                          child: Container(
                            constraints: BoxConstraints(maxWidth: 500),
                            margin: EdgeInsets.symmetric(
                              horizontal: 20,
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Text(
                                  'Изменение профиля',
                                  style: TextStyle(
                                    fontSize: 24,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        SizedBox(
                          height: 15,
                        ),
                        Center(
                          child: Container(
                            margin: EdgeInsets.only(
                              bottom: 15,
                              left: 20,
                              right: 20,
                            ),
                            constraints: BoxConstraints(maxWidth: 500),
                            child: Input(
                              isPassword: false,
                              hintText: 'Имя',
                              controller: _controllerName,
                              type: InputTypeCustom.inputText,
                            ),
                          ),
                        ),
                        Center(
                          child: Container(
                            margin: EdgeInsets.only(
                              bottom: 15,
                              left: 20,
                              right: 20,
                            ),
                            constraints: BoxConstraints(maxWidth: 500),
                            child: Input(
                              isPassword: false,
                              hintText: 'Фамилия',
                              controller: _controllerSurname,
                              type: InputTypeCustom.inputText,
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
                                            color: Color.fromRGBO(
                                              89,
                                              65,
                                              174,
                                              1,
                                            ),
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
                                      text: 'Изменить',
                                      isLoading: false,
                                      onPressed: () async {
                                        String? token = await _storage.read(
                                          key: 'token',
                                        );
                                        await _dio.put(
                                          '/api/user/edit-profile',
                                          data: jsonEncode({
                                            'name': _controllerName.text,
                                            'surname': _controllerSurname.text,
                                          }),
                                          options: Options(
                                            headers: {
                                              'Authorization': 'Bearer $token',
                                            },
                                          ),
                                        );
                                        Navigator.pop(context);
                                      },
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
                            margin: EdgeInsets.only(
                              bottom: 15,
                              left: 20,
                              right: 20,
                            ),
                            child: BackendButton(
                              text: 'Изменить',
                              isLoading: false,
                              onPressed: () async {
                                String? token = await _storage.read(
                                  key: 'token',
                                );
                                await _dio.put(
                                  '/api/user/edit-profile',
                                  data: jsonEncode({
                                    'name': _controllerName.text,
                                    'surname': _controllerSurname.text,
                                  }),
                                  options: Options(
                                    headers: {'Authorization': 'Bearer $token'},
                                  ),
                                );
                                Navigator.pop(context);
                              },
                            ),
                          ),
                      ],
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
