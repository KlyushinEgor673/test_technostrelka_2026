import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/widgets/footer.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';

import '../widgets/header.dart';

class Recommendations extends StatefulWidget {
  const Recommendations({super.key});

  @override
  State<Recommendations> createState() => _RecommendationsState();
}

class _RecommendationsState extends State<Recommendations> {
  late Dio _dio;
  late String? _token;
  final _storage = FlutterSecureStorage();
  List _subscriptions = [];

  List _categories = [];
  int? _dropdownValue = 0;
  List<DropdownMenuItem> _itemsDropdown = [
    DropdownMenuItem(child: Text('Все'), value: 0),
  ];

  Future<void> _init() async {
    _token = await _storage.read(key: 'token');
    final response = await _dio.get(
      '/api/subscription/all',
      options: Options(headers: {'Authorization': 'Bearer $_token'}),
    );
    final responseCategories = await _dio.get(
      '/api/subscription/category',
      options: Options(headers: {'Authorization': 'Bearer $_token'}),
    );
    _categories = responseCategories.data['categories'];
    for (final category in _categories) {
      _itemsDropdown.add(
        DropdownMenuItem(child: Text(category['name']), value: category['id']),
      );
    }
    setState(() {
      _subscriptions = response.data['allSubsWithBase64'];
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
      appBar: Header(id: 0),
      body: SafeArea(
        child: Column(
          children: [
            SizedBox(height: 20),
            Container(
              width: MediaQuery.of(context).size.width > 1040 ? 1000 : null,
              padding: EdgeInsets.symmetric(
                horizontal: MediaQuery.of(context).size.width > 1040 ? 0 : 10,
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  DropdownButton(
                    value: _dropdownValue,
                    dropdownColor: Colors.white,
                    items: _itemsDropdown,
                    menuMaxHeight: 180,
                    onChanged: (newValue) async {
                      print(newValue);
                      if (newValue != null) {
                        // _subscriptions = _subscriptions.map((item) => )
                        _subscriptions = [];
                        final response = await _dio.get(
                          '/api/subscription/all',
                          options: Options(
                            headers: {'Authorization': 'Bearer $_token'},
                          ),
                        );
                        if (newValue == 0) {
                          _subscriptions = response.data['allSubsWithBase64'];
                        } else {
                          for (final subscription
                              in response.data['allSubsWithBase64']) {
                            if (subscription['category_id'] == newValue){
                              _subscriptions.add(subscription);
                            }
                          }
                        }
                        setState(() {
                          _dropdownValue = newValue;
                        });
                      }
                    },
                  ),
                ],
              ),
            ),
            SizedBox(height: 20),
            Expanded(
              child: Center(
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
                      childAspectRatio: 2.1,
                    ),
                    itemCount: _subscriptions.length,
                    itemBuilder: (context, i) {
                      String category = '';
                      for (final categoryMap in _categories) {
                        if (_subscriptions[i]['category_id'] ==
                            categoryMap['id']) {
                          category = categoryMap['name'];
                          break;
                        }
                      }
                      return GestureDetector(
                        child: Container(
                          padding: EdgeInsets.symmetric(horizontal: 15),
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
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              SizedBox(
                                height: 75,
                                width: 75,
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(100),
                                  child: Image.memory(
                                    base64Decode(_subscriptions[i]['img']),
                                    fit: BoxFit.cover,
                                  ),
                                ),
                              ),
                              SizedBox(width: 15),
                              Expanded(
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      _subscriptions[i]['name'],
                                      style: TextStyle(
                                        fontWeight: FontWeight.w700,
                                        fontSize: 16,
                                      ),
                                    ),
                                    Text(
                                      '${category} ∙ ${_subscriptions[i]['period']} дней',
                                      style: TextStyle(fontSize: 16),
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
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                        onTap: () async {
                          launchUrl(Uri.parse(_subscriptions[i]['url']));
                        },
                      );
                    },
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: SafeArea(child: Footer(currentIndex: 0)),
    );
  }
}
