import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/alerts.dart';
import 'package:frontend/widgets/input.dart';
import 'package:frontend/widgets/select_date.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';

class CreateSubscription extends StatefulWidget {
  const CreateSubscription({super.key, this.id});

  final int? id;

  @override
  State<CreateSubscription> createState() => _CreateSubscriptionState();
}

class _CreateSubscriptionState extends State<CreateSubscription> {
  final _controllerName = TextEditingController();
  final _controllerCategory = TextEditingController();
  final _controllerPrice = TextEditingController();
  final _controllerPeriod = TextEditingController();
  final _controllerUrl = TextEditingController();

  // String? _dateStart;
  String? _dateEnd;
  bool _isAuto = false;
  var bytes;
  final _picker = ImagePicker();
  late final _dio;
  final _storage = FlutterSecureStorage();
  bool _isLoaded = false;

  Future<void> _init() async {
    if (widget.id != null) {
      String? token = await _storage.read(key: 'token');
      final response = await _dio.get(
        '/api/subscription/',
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );
      for (final subscription in response.data['subscriptions']) {
        if (widget.id == subscription['id']) {
          print('Aaaaaaaaaaa');
          setState(() {
            _controllerName.text = subscription['name'];
            _controllerCategory.text = subscription['category'];
            _controllerPrice.text = subscription['price'].toString();
            _controllerPeriod.text = subscription['period'].toString();
            _dateEnd = subscription['end_date'];
            _controllerUrl.text = subscription['url'];
            _isAuto = subscription['flag_auto'];
            bytes = base64Decode(subscription['img']);
          });
          break;
        }
      }
    }
    setState(() {
      _isLoaded = true;
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
      appBar: AppBar(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
      ),
      body: Container(
        height: MediaQuery.of(context).size.height,
        width: MediaQuery.of(context).size.width,
        // decoration: BoxDecoration(
        //   gradient: LinearGradient(
        //     colors: [
        //       Color.fromRGBO(225, 228, 234, 1),
        //       Color.fromRGBO(211, 222, 250, 1),
        //     ],
        //   ),
        // ),
        color: Colors.white,
        child: _isLoaded
            ? SafeArea(
                child: ListView(
                  // crossAxisAlignment: CrossAxisAlignment.center,
                  // mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            margin: EdgeInsets.only(left: 20, bottom: 20),
                            child: Text(
                              'Создание подписки',
                              style: TextStyle(fontSize: 24),
                            ),
                          ),
                          Container(
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
                          Container(
                            margin: EdgeInsets.only(
                              bottom: 15,
                              left: 20,
                              right: 20,
                            ),
                            constraints: BoxConstraints(maxWidth: 500),
                            child: Input(
                              isPassword: false,
                              hintText: 'Категория',
                              controller: _controllerCategory,
                              type: InputTypeCustom.inputText,
                            ),
                          ),
                          Container(
                            margin: EdgeInsets.only(
                              bottom: 15,
                              left: 20,
                              right: 20,
                            ),
                            constraints: BoxConstraints(maxWidth: 500),
                            child: Input(
                              isPassword: false,
                              hintText: 'Период',
                              controller: _controllerPeriod,
                              type: InputTypeCustom.inputInt,
                            ),
                          ),
                          Container(
                            margin: EdgeInsets.only(
                              bottom: 15,
                              left: 20,
                              right: 20,
                            ),
                            constraints: BoxConstraints(maxWidth: 500),
                            child: SelectDate(
                              hintText: 'Конечная дата',
                              change: (newValue) {
                                _dateEnd = newValue;
                              },
                              firstDate: DateTime.now(),
                              lastDate: DateTime(2100),
                              value: _dateEnd,
                            ),
                          ),
                          Container(
                            margin: EdgeInsets.only(
                              bottom: 15,
                              left: 20,
                              right: 20,
                            ),
                            constraints: BoxConstraints(maxWidth: 500),
                            child: Input(
                              isPassword: false,
                              hintText: 'Цена',
                              controller: _controllerPrice,
                              type: InputTypeCustom.inputDouble,
                            ),
                          ),
                          Container(
                            margin: EdgeInsets.only(
                              bottom: 15,
                              left: 20,
                              right: 20,
                            ),
                            constraints: BoxConstraints(maxWidth: 500),
                            child: Input(
                              isPassword: false,
                              hintText: 'url сайта',
                              controller: _controllerUrl,
                              type: InputTypeCustom.inputText,
                            ),
                          ),
                          Container(
                            margin: EdgeInsets.only(left: 20, right: 20),
                            constraints: BoxConstraints(maxWidth: 500),
                            child: Row(
                              children: [
                                Checkbox(
                                  value: _isAuto,
                                  onChanged: (newValue) {
                                    setState(() {
                                      _isAuto = !_isAuto;
                                    });
                                  },
                                ),
                                Text('Автопродление'),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    GestureDetector(
                      child: Center(
                        child: Container(
                          width: 170,
                          height: 170,
                          decoration: BoxDecoration(
                            color: bytes != null
                                ? Colors.black
                                : Color.fromRGBO(240, 240, 240, 1),
                            shape: BoxShape.circle,
                          ),
                          child: bytes != null
                              ? ClipRRect(
                                  borderRadius: BorderRadius.circular(100),
                                  child: Image.memory(bytes, fit: BoxFit.cover),
                                )
                              : Center(child: Icon(Icons.add, size: 50)),
                        ),
                      ),
                      onTap: () async {
                        XFile? res = await _picker.pickImage(
                          source: ImageSource.gallery,
                        );
                        if (res != null) {
                          var newBytes = await res.readAsBytes();
                          setState(() {
                            bytes = newBytes;
                          });
                        }
                      },
                    ),
                    Center(
                      child: Container(
                        margin: EdgeInsets.only(top: 15, left: 20, right: 20),
                        width: double.infinity,
                        constraints: BoxConstraints(maxWidth: 500),
                        height: 50,
                        child: FilledButton(
                          onPressed: widget.id != null
                              ? () async {
                                  String? token = await _storage.read(
                                    key: 'token',
                                  );
                                  final base64String = base64Encode(bytes);
                                  print('Отправляю ${_dateEnd.toString().substring(0, 10)}');
                                  await _dio.put(
                                    '/api/subscription',
                                    data: FormData.fromMap({
                                      'id': widget.id,
                                      'name': _controllerName.text,
                                      'category': _controllerCategory.text,
                                      'period': int.parse(
                                        _controllerPeriod.text,
                                      ),
                                      'end_date': _dateEnd.toString().substring(0, 10),
                                      'price': double.parse(
                                        _controllerPrice.text,
                                      ),
                                      'flag_auto': _isAuto,
                                      'img': MultipartFile.fromBytes(
                                        bytes,
                                        filename: 'image.png',
                                      ),
                                      'url': _controllerUrl.text,
                                    }),
                                    options: Options(
                                      headers: {
                                        'Authorization': 'Bearer $token',
                                      },
                                    ),
                                  );
                                  Navigator.pop(context);
                                }
                              : () async {
                                  String? token = await _storage.read(
                                    key: 'token',
                                  );
                                  // final base64String = base64Encode(bytes);
                                  await _dio.post(
                                    '/api/subscription/',
                                    data: FormData.fromMap({
                                      'name': _controllerName.text,
                                      'category': _controllerCategory.text,
                                      'period': int.parse(
                                        _controllerPeriod.text,
                                      ),
                                      'end_date': _dateEnd.toString(),
                                      'price': double.parse(
                                        _controllerPrice.text,
                                      ),
                                      'flag_auto': _isAuto,
                                      'img': MultipartFile.fromBytes(
                                        bytes,
                                        filename: 'image.png',
                                      ),
                                      'url': _controllerUrl.text,
                                    }),
                                    options: Options(
                                      headers: {
                                        'Authorization': 'Bearer $token',
                                      },
                                    ),
                                  );
                                  Navigator.pop(context);
                                },
                          child: Text(
                            widget.id == null ? 'Создать' : 'Изменить',
                          ),
                          style: FilledButton.styleFrom(
                            backgroundColor: Color.fromRGBO(89, 65, 174, 1),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              )
            : Center(child: CircularProgressIndicator()),
      ),
    );
  }
}
