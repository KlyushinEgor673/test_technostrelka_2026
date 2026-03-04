import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class YoomoneySubscriptions extends StatefulWidget {
  const YoomoneySubscriptions({super.key});

  @override
  State<YoomoneySubscriptions> createState() => _YoomoneySubscriptionsState();
}

class _YoomoneySubscriptionsState extends State<YoomoneySubscriptions> {
  List _subscriptions = [];
  final _dio = Dio();
  final _storage = FlutterSecureStorage();

  Future<void> _init() async {
    // final token = await _storage.read(key: 'token');
    // final response = await _dio.get('http://localhost:3000/api/yoomoney/subscription', options: Options(
    //   headers: {
    //     'Authorization': 'Bearer $token'
    //   }
    // ));
    String? subscriptions = await _storage.read(key: 'yoomoney_subscriptions');
    setState(() {
      _subscriptions = jsonDecode(subscriptions!);
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
        child: SafeArea(
          child: Center(
            child: Column(
              children: [
                Row(
                  children: [
                    TextButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/yoomoney_subscriptions');
                      },
                      child: Text(
                        'Подписки юMoney',
                        style: TextStyle(decoration: TextDecoration.underline),
                      ),
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/subscriptions');
                      },
                      child: Text('Подписки'),
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
                  child: SizedBox(
                    width: 1000,
                    child: GridView.builder(
                      itemCount: _subscriptions.length,
                      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 3,
                        mainAxisSpacing: 20,
                        crossAxisSpacing: 20,
                        childAspectRatio: 1.5,
                      ),
                      itemBuilder: (context, i) {
                        return Container(
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
                                      child: Image.network(
                                        _subscriptions[i]['img'],
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
                                    // SizedBox(height: 2.5),
                                    Text(_subscriptions[i]['days']),
                                    Text(
                                      _subscriptions[i]['price'],
                                      style: TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.w700,
                                      ),
                                    ),
                                    SizedBox(height: 2.5),
                                    Text(
                                      _subscriptions[i]['end'],
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
                            ],
                          ),
                        );
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
