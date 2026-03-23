import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/alerts.dart';
import 'package:frontend/widgets/backend_button.dart';
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
  List<DropdownMenuItem> _listDropdown = [];
  int? _dropdownValue;
  late bool _isCan;

  void _checkCan() {
    if (_controllerName.text.isNotEmpty &&
        _dropdownValue != null &&
        _controllerPeriod.text.isNotEmpty &&
        _dateEnd != null &&
        _controllerPrice.text.isNotEmpty &&
        _controllerUrl.text.isNotEmpty &&
        bytes != null) {
      setState(() {
        _isCan = true;
      });
    } else {
      setState(() {
        _isCan = false;
      });
    }
  }

  Future<void> _createSubscription() async {
    String? token = await _storage.read(key: 'token');
    // final base64String = base64Encode(bytes);
    await _dio.post(
      '/api/subscription/',
      data: FormData.fromMap({
        'name': _controllerName.text,
        'category_id': _dropdownValue,
        'period': int.parse(_controllerPeriod.text),
        'end_date': _dateEnd.toString(),
        'price': double.parse(_controllerPrice.text),
        'flag_auto': _isAuto,
        'img': MultipartFile.fromBytes(bytes, filename: 'image.png'),
        'url': _controllerUrl.text,
      }),
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
    Navigator.pop(context);
    print('create ${_dropdownValue}');
  }

  Future<void> _changeSubscription() async {
    String? token = await _storage.read(key: 'token');
    final base64String = base64Encode(bytes);
    print('Отправляю ${_dateEnd.toString().substring(0, 10)}');
    try {
      print(_dropdownValue);
      await _dio.put(
        '/api/subscription',
        data: FormData.fromMap({
          'id': widget.id,
          'name': _controllerName.text,
          'category_id': _dropdownValue,
          'period': int.parse(_controllerPeriod.text),
          'end_date': _dateEnd.toString().substring(0, 10),
          'price': double.parse(_controllerPrice.text),
          'flag_auto': _isAuto,
          'img': MultipartFile.fromBytes(bytes, filename: 'image.png'),
          'url': _controllerUrl.text,
        }),
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );
      Navigator.pop(context);
    } on DioException catch (e) {
      print(e.response?.data);
    }
  }

  Future<void> _init() async {
    String? token = await _storage.read(key: 'token');
    final responseCategories = await _dio.get(
      '/api/subscription/category',
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
    for (final category in responseCategories.data['categories']) {
      _listDropdown.add(
        DropdownMenuItem(child: Text(category['name']), value: category['id']),
      );
    }
    if (widget.id != null) {
      final response = await _dio.get(
        '/api/subscription/',
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );
      for (final subscription in response.data['subscriptions']) {
        if (widget.id == subscription['id']) {
          setState(() {
            _controllerName.text = subscription['name'];
            // _controllerCategory.text = subscription['category'];
            setState(() {
              _dropdownValue = subscription['category_id'];
            });
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
    _isCan = widget.id != null;
    _dio = Provider.of<Dio>(context, listen: false);
    print(_isCan);
    _controllerName.addListener(() => _checkCan());
    _controllerPeriod.addListener(() => _checkCan());
    _controllerPrice.addListener(() => _checkCan());
    _controllerUrl.addListener(() => _checkCan());
    _init();
  }

  @override
  Widget build(BuildContext context) {
    print('CHANGE ${_isCan}');
    _checkCan();
    final orientation = MediaQuery.of(context).orientation;
    return Scaffold(
      appBar: MediaQuery.of(context).size.width < 540
          ? AppBar(
              backgroundColor: Colors.white,
              surfaceTintColor: Colors.white,
            )
          : null,
      body: Container(
        height: MediaQuery.of(context).size.height,
        width: MediaQuery.of(context).size.width,
        color: Colors.white,
        child: _isLoaded
            ? SafeArea(
                child: ListView(
                  children: [
                    SizedBox(
                      height: MediaQuery.of(context).size.height > 667
                          ? MediaQuery.of(context).size.height
                          : null,
                      child: Stack(
                        children: [
                          Center(
                            child: Column(
                              mainAxisAlignment:
                                  MediaQuery.of(context).size.height > 667
                                  ? MainAxisAlignment.center
                                  : MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Center(
                                  child: Container(
                                    width: double.infinity,
                                    constraints: BoxConstraints(maxWidth: 500),
                                    margin: EdgeInsets.only(
                                      left: 20,
                                      right: 20,
                                    ),
                                    child: Row(
                                      children: [
                                        Text(
                                          widget.id == null
                                              ? 'Создание подписки'
                                              : 'Изменение подписки',
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
                                    margin: EdgeInsets.only(
                                      bottom: 15,
                                      left: 20,
                                      right: 20,
                                    ),
                                    child: Input(
                                      readOnly: false,
                                      isPassword: false,
                                      hintText: 'Имя',
                                      controller: _controllerName,
                                      type: InputTypeCustom.inputText,
                                    ),
                                  ),
                                ),
                                Center(
                                  child: Container(
                                    width: double.infinity,
                                    margin: EdgeInsets.symmetric(
                                      horizontal: 20,
                                    ),
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(10),
                                      color: Color.fromRGBO(240, 240, 240, 1),
                                    ),
                                    height: 50,
                                    constraints: BoxConstraints(maxWidth: 500),
                                    child: Container(
                                      margin: EdgeInsets.only(left: 14),
                                      child: Align(
                                        alignment: Alignment.centerLeft,
                                        child: DropdownButton(
                                          value: _dropdownValue,
                                          // menuWidth: double.infinity,
                                          menuWidth: 500,
                                          menuMaxHeight: 180,
                                          dropdownColor: Colors.white,
                                          hint: Text(
                                            'Выберете категорию',
                                            style: TextStyle(
                                              color: Colors.grey,
                                            ),
                                          ),
                                          items: _listDropdown,
                                          onChanged: (newValue) {
                                            setState(() {
                                              _dropdownValue = newValue;
                                            });
                                            _checkCan();
                                          },
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                SizedBox(height: 15),
                                Center(
                                  child: Container(
                                    margin: EdgeInsets.only(
                                      bottom: 15,
                                      left: 20,
                                      right: 20,
                                    ),

                                    child: Input(
                                      readOnly: false,
                                      isPassword: false,
                                      hintText: 'Период',
                                      controller: _controllerPeriod,
                                      type: InputTypeCustom.inputInt,
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

                                    child: SelectDate(
                                      hintText: 'Конечная дата',
                                      change: (newValue) {
                                        _dateEnd = newValue;
                                        _checkCan();
                                      },
                                      firstDate: DateTime.now(),
                                      lastDate: DateTime(2100),
                                      value: _dateEnd,
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

                                    child: Input(
                                      readOnly: false,
                                      isPassword: false,
                                      hintText: 'Цена',
                                      controller: _controllerPrice,
                                      type: InputTypeCustom.inputDouble,
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

                                    child: Input(
                                      readOnly: false,
                                      isPassword: false,
                                      hintText: 'Url сайта',
                                      controller: _controllerUrl,
                                      type: InputTypeCustom.inputText,
                                    ),
                                  ),
                                ),
                                Center(
                                  child: Container(
                                    width: double.infinity,
                                    constraints: BoxConstraints(maxWidth: 500),
                                    margin: EdgeInsets.only(
                                      left: 20,
                                      right: 20,
                                    ),
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
                                        Text(
                                          'Автопродление',
                                          style: TextStyle(fontSize: 16),
                                        ),
                                      ],
                                    ),
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
                                              borderRadius:
                                                  BorderRadius.circular(100),
                                              child: Image.memory(
                                                bytes,
                                                fit: BoxFit.cover,
                                              ),
                                            )
                                          : Center(
                                              child: Icon(Icons.add, size: 50),
                                            ),
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
                                      _checkCan();
                                    }
                                  },
                                ),
                                SizedBox(height: 15),
                                if (MediaQuery.of(context).size.width > 540)
                                  Center(
                                    child: Container(
                                      margin: EdgeInsets.only(
                                        bottom: 15,
                                        left: 20,
                                        right: 20,
                                      ),
                                      width: double.infinity,
                                      constraints: BoxConstraints(
                                        maxWidth: 500,
                                      ),
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
                                                borderRadius:
                                                    BorderRadius.circular(10),
                                                border: Border.all(
                                                  color: Color.fromRGBO(
                                                    89,
                                                    65,
                                                    174,
                                                    1,
                                                  ),
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
                                            constraints: BoxConstraints(
                                              maxWidth: 500,
                                            ),
                                            child: BackendButton(
                                              color: Color.fromRGBO(
                                                89,
                                                65,
                                                174,
                                                1,
                                              ),
                                              text: widget.id == null
                                                  ? 'Создать'
                                                  : 'Изменить',
                                              isLoading: false,
                                              onPressed: _isCan
                                                  ? widget.id == null
                                                        ? _createSubscription
                                                        : _changeSubscription
                                                  : null,
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
                                      color: Color.fromRGBO(89, 65, 174, 1),
                                      text: widget.id == null
                                          ? 'Создать'
                                          : 'Изменить',
                                      isLoading: false,
                                      onPressed: _isCan
                                          ? widget.id == null
                                                ? _createSubscription
                                                : _changeSubscription
                                          : null,
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
              )
            : Center(child: CircularProgressIndicator()),
      ),
    );
  }
}
