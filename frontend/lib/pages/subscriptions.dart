import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:url_launcher/url_launcher.dart';

class Subscriptions extends StatefulWidget {
  const Subscriptions({super.key});

  @override
  State<Subscriptions> createState() => _SubscriptionsState();
}

class _SubscriptionsState extends State<Subscriptions> {
  List _subscriptions = [];
  final _dio = Dio();
  final _storage = FlutterSecureStorage();

  Future<void> _init() async {
    String? token = await _storage.read(key: 'token');
    final response = await _dio.get(
      'http://localhost:3000/api/subscription/',
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
    setState(() {
      _subscriptions = response.data['subscriptions'];
    });
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
      body: Container(
        height: MediaQuery.of(context).size.height,
        width: MediaQuery.of(context).size.width,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Color.fromRGBO(225, 228, 234, 1),
              Color.fromRGBO(211, 222, 250, 1),
            ],
          ),
        ),
        child: Column(
          children: [
            Row(
              children: [
                TextButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/subscriptions');
                  },
                  child: Text(
                    'Подписки',
                    style: TextStyle(decoration: TextDecoration.underline),
                  ),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/profile');
                  },
                  child: Text('Профиль'),
                ),
              ],
            ),
            Expanded(
              child: GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 3,
                ),
                itemCount: _subscriptions.length,
                itemBuilder: (context, i) {
                  print(
                    '${DateTime.parse(_subscriptions[i]['end_date'])} - ${DateTime.parse(_subscriptions[i]['start_date'])} = ${DateTime.parse(_subscriptions[i]['end_date']).difference(DateTime.parse(_subscriptions[i]['start_date'])).inDays.toString()}',
                  );
                  return GestureDetector(
                    child: Container(
                      width: 300,
                      height: 210,
                      // padding: EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(30),
                        color: Colors.white,
                        boxShadow: [
                          BoxShadow(
                            color: Colors.grey.withAlpha(100),
                            spreadRadius: 8,
                            blurRadius: 8,
                          ),
                        ],
                      ),
                      child: Stack(
                        children: [
                          Positioned(
                            left: 20,
                            top: 0,
                            bottom: 0,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(100),
                                  child: Image.memory(
                                    base64Decode(_subscriptions[i]['img']),
                                    height: 50,
                                    width: 50,
                                  ),
                                ),
                                SizedBox(height: 5),
                                Text(
                                  _subscriptions[i]['name'],
                                  style: TextStyle(
                                    fontWeight: FontWeight.w700,
                                    fontSize: 16,
                                  ),
                                ),
                                SizedBox(height: 2.5),
                                Text(
                                  '${DateTime.parse(_subscriptions[i]['end_date']).difference(DateTime.parse(_subscriptions[i]['start_date'])).inDays.toString()} дней',
                                ),
                                SizedBox(height: 2.5),
                                GestureDetector(
                                  child: Text(
                                    _subscriptions[i]['url'],
                                    style: TextStyle(
                                      color: Color.fromRGBO(89, 65, 174, 1),
                                    ),
                                  ),
                                  onTap: () {
                                    launchUrl(
                                      Uri.parse(_subscriptions[i]['url']),
                                    );
                                  },
                                ),
                                SizedBox(height: 2.5),
                                Text(
                                  '${_subscriptions[i]['price']} ₽',
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                                SizedBox(height: 2.5),
                                Text(
                                  '${_subscriptions[i]['flag_auto'] ? 'Спишется' : 'Закончится'} ${_subscriptions[i]['end_date'].substring(0, 10)}',
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: Color.fromRGBO(89, 65, 174, 1),
                                    //Color.fromRGBO(216, 139, 49, 1),
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Positioned(
                            top: 10,
                            right: 10,
                            child: IconButton(
                              onPressed: () async {
                                String? token = await _storage.read(
                                  key: 'token',
                                );
                                await _dio.delete(
                                  'http://localhost:3000/api/subscription',
                                  data: jsonEncode({
                                    'id': _subscriptions[i]['id'],
                                  }),
                                  options: Options(
                                    headers: {'Authorization': 'Bearer $token'},
                                  ),
                                );
                                await _init();
                              },
                              icon: Icon(Icons.close),
                            ),
                          ),
                        ],
                      ),
                    ),
                    onTap: () async {
                      await Navigator.pushNamed(
                        context,
                        '/create_subscription',
                        arguments: {'id': _subscriptions[i]['id']},
                      );
                      await _init();
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          await Navigator.pushNamed(
            context,
            '/create_subscription',
            arguments: {'id': null},
          );
          await _init();
        },
        backgroundColor: Color.fromRGBO(89, 65, 174, 1),
        child: Icon(Icons.add, color: Colors.white),
      ),
    );
  }
}
