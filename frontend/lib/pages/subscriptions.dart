import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/widgets/chip_button.dart';
import 'package:frontend/widgets/footer.dart';
import 'package:frontend/widgets/input.dart';
import 'package:provider/provider.dart';
import 'package:s_webview/s_webview.dart';
import 'package:url_launcher/url_launcher.dart';

import '../widgets/header.dart';

class Subscriptions extends StatefulWidget {
  const Subscriptions({super.key});

  @override
  State<Subscriptions> createState() => _SubscriptionsState();
}

class _SubscriptionsState extends State<Subscriptions> {
  List _subscriptions = [];
  late final _dio;
  final _storage = FlutterSecureStorage();
  String _dropdownValue = 'Все';
  final _controllerSearch = TextEditingController();
  bool _isYoomoney = false;

  Future<void> _init() async {
    String? token = await _storage.read(key: 'token');
    final responseMe = await _dio.get(
      '/api/user/me',
      options: Options(headers: {'authorization': 'Bearer $token'}),
    );
    setState(() {
      _isYoomoney = responseMe.data['user']['is_enter_ym'];
    });
    final response = await _dio.get(
      '/api/subscription/',
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
    setState(() {
      _subscriptions = response.data['subscriptions'];
    });
    if (_isYoomoney){
      String? subscriptions_yoomoney = await _storage.read(
        key: 'yoomoney_subscriptions',
      );
      List subscriptions_yoomoney_list = jsonDecode(subscriptions_yoomoney!);
      for (int i = 0; i < subscriptions_yoomoney_list!.length; ++i) {
        _subscriptions.add(subscriptions_yoomoney_list[i]);
      }
    }
    setState(() {});
  }

  void _checkSearch() {
    final _subscriptionsCopy = List.from(_subscriptions);
    for (final item in _subscriptionsCopy) {
      if (!item['name'].toLowerCase().contains(
        _controllerSearch.text.toLowerCase(),
      )) {
        _subscriptions.remove(item);
        print(item['name']);
      }
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _dio = Provider.of<Dio>(context, listen: false);
    _controllerSearch.addListener(() async {
      String? token = await _storage.read(key: 'token');
      if (_dropdownValue == 'Все') {
        final response = await _dio.get(
          '/api/subscription/',
          options: Options(headers: {'Authorization': 'Bearer $token'}),
        );
        _subscriptions = response.data['subscriptions'];
        if (_isYoomoney){
          String? subscriptions_yoomoney = await _storage.read(
            key: 'yoomoney_subscriptions',
          );
          List subscriptions_yoomoney_list = jsonDecode(subscriptions_yoomoney!);
          for (int i = 0; i < subscriptions_yoomoney_list!.length; ++i) {
            _subscriptions.add(subscriptions_yoomoney_list[i]);
          }
        }
      } else if (_dropdownValue == 'Сoздaнныe') {
        final response = await _dio.get(
          '/api/subscription/',
          options: Options(headers: {'Authorization': 'Bearer $token'}),
        );
        _subscriptions = response.data['subscriptions'];
      } else {
        String? subscriptions_yoomoney = await _storage.read(
          key: 'yoomoney_subscriptions',
        );
        _subscriptions = jsonDecode(subscriptions_yoomoney!);
      }
      _checkSearch();
      setState(() {});
    });
    _init();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        height: MediaQuery.of(context).size.height,
        width: MediaQuery.of(context).size.width,
        decoration: BoxDecoration(color: Colors.white),
        child: SafeArea(
          child: Column(
            children: [
              Header(id: 2),
              if (MediaQuery.of(context).size.width > 768) SizedBox(height: 20),
              Container(
                height: 50,
                width: MediaQuery.of(context).size.width > 1040 ? 1000 : null,
                margin: EdgeInsets.symmetric(horizontal: 20),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: Color.fromRGBO(245, 245, 249, 1),
                ),
                child: Row(
                  children: [
                    SizedBox(width: 14),
                    Icon(Icons.search, color: Color.fromRGBO(126, 126, 154, 1)),
                    SizedBox(width: 14),
                    Expanded(
                      child: TextField(
                        style: TextStyle(fontSize: 16),
                        controller: _controllerSearch,
                        decoration: InputDecoration(
                          border: InputBorder.none,
                          hintText: 'Поиск',
                          hintStyle: TextStyle(
                            color: Color.fromRGBO(126, 126, 154, 1),
                            fontSize: 16,
                          ),
                        ),
                      ),
                    ),
                    SizedBox(width: 14),
                  ],
                ),
              ),
              SizedBox(height: 15),
              Container(
                width: MediaQuery.of(context).size.width > 1040 ? 1000 : null,
                margin: EdgeInsets.only(left: 20, bottom: 20),
                child: Row(
                  // mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ChipButton(
                      text: 'Все',
                      isActive: _dropdownValue == 'Все' ? true : false,
                      onTap: () async {
                        String? token = await _storage.read(key: 'token');
                        final response = await _dio.get(
                          '/api/subscription/',
                          options: Options(
                            headers: {'Authorization': 'Bearer $token'},
                          ),
                        );
                        _subscriptions = response.data['subscriptions'];
                        if (_isYoomoney){
                          String? subscriptions_yoomoney = await _storage.read(
                            key: 'yoomoney_subscriptions',
                          );
                          List subscriptions_yoomoney_list = jsonDecode(
                            subscriptions_yoomoney!,
                          );
                          for (
                          int i = 0;
                          i < subscriptions_yoomoney_list!.length;
                          ++i
                          ) {
                            _subscriptions.add(subscriptions_yoomoney_list[i]);
                          }
                        }
                        _checkSearch();
                        setState(() {
                          _dropdownValue = 'Все';
                        });
                      },
                    ),
                    SizedBox(width: 15),
                    ChipButton(
                      text: 'Созданные',
                      isActive: _dropdownValue == 'Созданные' ? true : false,
                      onTap: () async {
                        String? token = await _storage.read(key: 'token');
                        final response = await _dio.get(
                          '/api/subscription/',
                          options: Options(
                            headers: {'Authorization': 'Bearer $token'},
                          ),
                        );
                        _checkSearch();
                        setState(() {
                          _subscriptions = response.data['subscriptions'];
                          _dropdownValue = 'Созданные';
                        });
                      },
                    ),
                    SizedBox(width: 15),
                    if (_isYoomoney)
                      ChipButton(
                        text: 'юMoney',
                        isActive: _dropdownValue == 'юMoney' ? true : false,
                        onTap: () async {
                          String? subscriptions_yoomoney = await _storage.read(
                            key: 'yoomoney_subscriptions',
                          );
                          _checkSearch();
                          setState(() {
                            _subscriptions = jsonDecode(
                              subscriptions_yoomoney!,
                            );
                            _dropdownValue = 'юMoney';
                          });
                        },
                      ),
                  ],
                ),
              ),
              Expanded(
                child: Container(
                  width: MediaQuery.of(context).size.width > 1040 ? 1000 : null,
                  padding: EdgeInsets.symmetric(
                    horizontal: MediaQuery.of(context).size.width > 1040
                        ? 0
                        : 10,
                  ),
                  child: GridView.builder(
                    padding: EdgeInsets.only(
                      right: 10,
                      left: 10,
                      bottom: 20,
                      top: 10,
                    ),
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: MediaQuery.of(context).size.width > 1040
                          ? 3
                          : MediaQuery.of(context).size.width > 650
                          ? 2
                          : 1,
                      // crossAxisCount: 1,
                      mainAxisSpacing: 10,
                      crossAxisSpacing: 20,
                      childAspectRatio: 2.3,
                    ),
                    itemCount: _subscriptions.length,
                    itemBuilder: (context, i) {
                      // if (!_subscriptions[i]['name'].contains(_controllerSearch.text)){
                      //   return SizedBox.shrink();
                      // }
                      if (_subscriptions[i]['url'] == null) {
                        return GestureDetector(
                          onTap: (){
                            launchUrl(Uri.parse('https://yoomoney.ru'));
                          },
                          child: Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(30),
                              color: Colors.white,
                              border: Border.all(
                                color: Color.fromRGBO(244, 244, 244, 1),
                                width: 1,
                              ),
                              boxShadow: [
                                BoxShadow(
                                  color: Color.fromRGBO(228, 232, 245, 0.6),
                                  blurRadius: 20,
                                ),
                              ],
                              // boxShadow: [
                              //   BoxShadow(
                              //     color: Colors.grey.withAlpha(100),
                              //     spreadRadius: 4,
                              //     blurRadius: 4,
                              //   ),
                              // ],
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
                                      Row(
                                        children: [
                                          ClipRRect(
                                            borderRadius: BorderRadius.circular(
                                              100,
                                            ),
                                            child: Image.network(
                                              _subscriptions[i]['img'],
                                              height: 50,
                                              width: 50,
                                            ),
                                          ),
                                          SizedBox(width: 20),
                                          Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Text(
                                                _subscriptions[i]['name'],
                                                style: TextStyle(
                                                  fontWeight: FontWeight.w700,
                                                  fontSize: 16,
                                                ),
                                              ),
                                              Text(_subscriptions[i]['days']),
                                            ],
                                          ),
                                        ],
                                      ),
                                      SizedBox(height: 10),
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
                          ),
                        );
                      }
                      print(_subscriptions[i]['end_date']);
                      return GestureDetector(
                        child: Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(30),
                            color: Colors.white,
                            border: Border.all(
                              color: Color.fromRGBO(244, 244, 244, 1),
                              width: 1,
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: Color.fromRGBO(228, 232, 245, 0.6),
                                blurRadius: 20,
                              ),
                            ],
                            // boxShadow: [
                            //   BoxShadow(
                            //     color: Colors.grey.withAlpha(100),
                            //     spreadRadius: 4,
                            //     blurRadius: 4,
                            //   ),
                            // ],
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
                                    Row(
                                      children: [
                                        ClipRRect(
                                          borderRadius: BorderRadius.circular(
                                            100,
                                          ),
                                          child: Image.memory(
                                            base64Decode(
                                              _subscriptions[i]['img'],
                                            ),
                                            height: 50,
                                            width: 50,
                                            fit: BoxFit.cover,
                                          ),
                                        ),
                                        SizedBox(width: 20),
                                        Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              _subscriptions[i]['name'],
                                              style: TextStyle(
                                                fontWeight: FontWeight.w700,
                                                fontSize: 16,
                                              ),
                                            ),
                                            Text(
                                              '${_subscriptions[i]['category']} ∙ ${_subscriptions[i]['period']} дней',
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                    SizedBox(height: 10),
                                    // GestureDetector(
                                    //   child: Text(
                                    //     _subscriptions[i]['url'] ?? '',
                                    //     style: TextStyle(
                                    //       color: Color.fromRGBO(89, 65, 174, 1),
                                    //     ),
                                    //   ),
                                    //   onTap: () {
                                    //     launchUrl(
                                    //       Uri.parse(_subscriptions[i]['url']),
                                    //     );
                                    //   },
                                    // ),
                                    Text(
                                      '${_subscriptions[i]['price']} ₽',
                                      style: TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.w700,
                                      ),
                                    ),
                                    SizedBox(height: 2.5),
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          '${_subscriptions[i]['flag_auto'] ? 'Спишется' : 'Активна до'} ${_subscriptions[i]['end_date'].substring(0, 10)}',
                                          style: TextStyle(
                                            fontSize: 16,
                                            color: Color.fromRGBO(89, 65, 174, 1),
                                            //Color.fromRGBO(216, 139, 49, 1),
                                            fontWeight: FontWeight.w700,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                              Positioned(
                                top: 5,
                                right: 10,
                                child: PopupMenuButton(
                                  color: Colors.white,
                                  itemBuilder: (context) => [
                                    PopupMenuItem(
                                      value: 'edit',
                                      child: Row(children: [
                                        Icon(Icons.edit),
                                        SizedBox(width: 5,),
                                        Text('Изменить')]),
                                    ),
                                    PopupMenuItem(
                                      value: 'delete',
                                      child: Row(
                                        children: [
                                          Icon(Icons.delete, color: Colors.red),
                                          SizedBox(width: 5),
                                          Text(
                                            'Удалить',
                                            style: TextStyle(color: Colors.red),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                  onSelected: (value) async {
                                    if (value == 'delete'){
                                      String? token = await _storage.read(
                                        key: 'token',
                                      );
                                      await _dio.delete(
                                        '/api/subscription',
                                        data: jsonEncode({
                                          'id': _subscriptions[i]['id'],
                                        }),
                                        options: Options(
                                          headers: {
                                            'Authorization': 'Bearer $token',
                                          },
                                        ),
                                      );
                                      await _init();
                                    } else {
                                      await Navigator.pushNamed(
                                        context,
                                        '/create_subscription',
                                        arguments: {'id': _subscriptions[i]['id']},
                                      );
                                      await _init();
                                    }
                                  },
                                  icon: Icon(Icons.more_horiz),
                                ),
                                // IconButton(
                                //   onPressed: () async {
                                //     String? token = await _storage.read(
                                //       key: 'token',
                                //     );
                                //     await _dio.delete(
                                //       '/api/subscription',
                                //       data: jsonEncode({
                                //         'id': _subscriptions[i]['id'],
                                //       }),
                                //       options: Options(
                                //         headers: {
                                //           'Authorization': 'Bearer $token',
                                //         },
                                //       ),
                                //     );
                                //     await _init();
                                //   },
                                //   icon: Icon(Icons.close),
                                // ),
                              ),
                            ],
                          ),
                        ),
                        onTap: () async {
                          launchUrl(
                            Uri.parse(_subscriptions[i]['url']),
                          );
                        },
                      );
                    },
                  ),
                ),
              ),
            ],
          ),
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
      bottomNavigationBar: Footer(currentIndex: 1),
    );
  }
}
