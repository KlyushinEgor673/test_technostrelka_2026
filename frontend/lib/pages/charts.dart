import 'dart:convert';
import 'dart:math';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/widgets/backend_button.dart';
import 'package:frontend/widgets/footer.dart';
import 'package:frontend/widgets/header.dart';
import 'package:frontend/widgets/select_date.dart';
import 'package:provider/provider.dart';

import '../widgets/chip_button.dart';

class Charts extends StatefulWidget {
  const Charts({super.key});

  @override
  State<Charts> createState() => _ChartsState();
}

class _ChartsState extends State<Charts> {
  late final _dio;
  final _storage = FlutterSecureStorage();
  Map _subscriptions = {};
  List<PieChartSectionData> _sections = [];
  List<BarChartGroupData> _barGroups = [];
  String _startDate = '';
  String _endDate = '';
  double _maxY = 0;
  List _chartList = [];
  List _subsYoomoney = [];
  bool _isLoaded = false;
  bool _isCan = false;

  void _checkCan() {
    // print('startDate ${_startDate != ''}');
    // print(_endDate != '');
    print('CHECK');
    if (_startDate != '' && _endDate != '') {
      setState(() {
        _isCan = true;
      });
    } else {
      setState(() {
        _isCan = false;
      });
    }
  }

  Future<void> _buildChart() async {
    _maxY = 0;
    _barGroups = [];
    String? token = await _storage.read(key: 'token');
    final response = await _dio.get(
      '/api/subscription/history',
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
    int countDays = DateTime.parse(
      _endDate,
    ).difference(DateTime.parse(_startDate)).inDays;
    DateTime startDate = DateTime.parse(_startDate);
    _chartList = [];
    for (int i = 0; i < countDays + 1; ++i) {
      DateTime date = startDate.add(Duration(days: i));
      bool isHas = false;
      late List listSubs;
      if (_subsYoomoney.length > 0) {
        print(response.data['debSubscriptions']);
        print(_subsYoomoney);
        listSubs = [...response.data['debSubscriptions'], ..._subsYoomoney];
      } else {
        listSubs = response.data['debSubscriptions'];
      }
      for (final item in listSubs) {
        final timestapz = DateTime.parse(item['date']);
        final dateTimeDB = DateTime(
          timestapz.year,
          timestapz.month,
          timestapz.day,
        );
        if (date == dateTimeDB) {
          // print('price ${double.parse(item['price'])} ${item['price'].runtimeType}');
          _chartList.add({
            'date': date,
            'price': double.parse(item['price'].toString()),
          });
          isHas = true;
          if (double.parse(item['price'].toString()) > _maxY) {
            _maxY = double.parse(item['price']);
          }
          break;
        }
      }
      if (!isHas) {
        _chartList.add({'date': date, 'price': 0.0});
      }
    }
    for (int i = 0; i < _chartList.length; ++i) {
      print(_chartList[i]['price'].runtimeType);
      _barGroups.add(
        BarChartGroupData(
          x: i,
          barRods: [
            BarChartRodData(
              toY: _chartList[i]['price'],
              color: Color.fromRGBO(89, 65, 174, 1),
            ),
          ],
        ),
      );
    }
    _maxY += _maxY * 0.05;
    setState(() {});
  }

  Future<void> _init() async {
    String? token = await _storage.read(key: 'token');
    final response = await _dio.get(
      '/api/user/me',
      options: Options(headers: {'authorization': 'Bearer $token'}),
    );
    if (response.data['user']['is_enter_ym']) {
      while (true) {
        String? subsYoomoney = await _storage.read(key: 'yoomoneyChart');
        if (subsYoomoney != null) {
          setState(() {
            _subsYoomoney = jsonDecode(subsYoomoney);
            _isLoaded = true;
          });
          break;
        }
        await Future.delayed(const Duration(seconds: 1));
      }
    } else {
      setState(() {
        _isLoaded = true;
      });
    }
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
    final width = MediaQuery.of(context).size.width;
    final height = MediaQuery.of(context).size.height;
    return _isLoaded == false
        ? Scaffold(
            backgroundColor: Colors.white,
            body: Center(
              child: CircularProgressIndicator(
                color: Color.fromRGBO(89, 65, 174, 1),
              ),
            ),
          )
        : Scaffold(
            backgroundColor: Colors.white,
            appBar:
                MediaQuery.of(context).size.width < 845 ||
                    defaultTargetPlatform == TargetPlatform.android ||
                    defaultTargetPlatform == TargetPlatform.iOS
                ? null
                : Header(id: 1),
            body: SafeArea(
              child: SizedBox(
                width: width,
                child: Stack(
                  children: [
                    Center(
                      child: Expanded(
                        child: SizedBox(
                          width: 810,
                          child: ListView(
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  SizedBox(height: 20),
                                  if (width < 810)
                                    Center(
                                      child: Container(
                                        margin: EdgeInsets.only(
                                          left: 20,
                                          right: 20,
                                        ),
                                        height: 50,
                                        child: SelectDate(
                                          hintText: 'Выберете начальную дату',
                                          change: (newValue) {
                                            setState(() {
                                              _startDate = newValue;
                                            });
                                            _checkCan();
                                          },
                                          firstDate: DateTime(1990),
                                          lastDate: DateTime(2100),
                                        ),
                                      ),
                                    ),
                                  if (width < 810) SizedBox(height: 20),
                                  if (width < 810)
                                    Center(
                                      child: Container(
                                        margin: EdgeInsets.only(
                                          left: 20,
                                          right: 20,
                                        ),
                                        height: 50,
                                        child: SelectDate(
                                          hintText: 'Выберете конечную дату',
                                          change: (newValue) {
                                            setState(() {
                                              _endDate = newValue;
                                            });
                                            _checkCan();
                                          },
                                          firstDate: DateTime(1990),
                                          lastDate: DateTime(2100),
                                        ),
                                      ),
                                    ),
                                  if (width < 810)
                                    SizedBox( height: 20,),
                                  if (width < 810)
                                    Center(
                                      child: Container(
                                        constraints: BoxConstraints(maxWidth: 500),
                                        margin: EdgeInsets.only(
                                          left: 20,
                                          right: 20,
                                        ),
                                        height: 50,
                                        width: double.infinity,
                                        child: BackendButton(
                                          color: Color.fromRGBO(89, 65, 174, 1),
                                          text: 'Построить',
                                          isLoading: false,
                                          onPressed: !_isCan ? null : _buildChart,
                                        ),
                                        // ChipButton(
                                        //   text: 'Построить',
                                        //   isActive: true,
                                        //   onTap: _buildChart,
                                        // ),
                                      ),
                                    ),
                                  if (width > 810)
                                    Container(
                                      margin: EdgeInsets.symmetric(
                                        horizontal: 20,
                                      ),
                                      width: 770,
                                      child: Row(
                                        children: [
                                          SizedBox(
                                            width: 250,
                                            child: SelectDate(
                                              hintText:
                                                  'Выберете начальную дату',
                                              change: (newValue) {
                                                _startDate = newValue;
                                                _checkCan();
                                              },
                                              firstDate: DateTime(1990),
                                              lastDate: DateTime(2100),
                                            ),
                                          ),
                                          SizedBox(width: 10),
                                          SizedBox(
                                            width: 250,
                                            child: SelectDate(
                                              hintText:
                                                  'Выберете конечную дату',
                                              change: (newValue) {
                                                _endDate = newValue;
                                                _checkCan();
                                              },
                                              firstDate: DateTime(1990),
                                              lastDate: DateTime(2100),
                                            ),
                                          ),
                                          SizedBox(width: 10),
                                          SizedBox(
                                            width: 250,
                                            child: BackendButton(
                                              color: Color.fromRGBO(
                                                89,
                                                65,
                                                174,
                                                1,
                                              ),
                                              text: 'Построить',
                                              isLoading: false,
                                              onPressed: !_isCan
                                                  ? null
                                                  : _buildChart,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  SizedBox(height: 20),
                                ],
                              ),
                              Center(
                                child: Container(
                                  width: 770,
                                  height: 490,
                                  margin: EdgeInsets.only(left: 20),
                                  child: SingleChildScrollView(
                                    scrollDirection: Axis.horizontal,
                                    clipBehavior: Clip.none,
                                    child: Center(
                                      child: Container(
                                        height: 480,
                                        width: _chartList.length * 30,
                                        constraints: BoxConstraints(
                                          minWidth: width < 810
                                              ? MediaQuery.of(
                                                      context,
                                                    ).size.width -
                                                    40 -
                                                    MediaQuery.of(
                                                      context,
                                                    ).padding.left -
                                                    MediaQuery.of(
                                                      context,
                                                    ).padding.right
                                              : 760,

                                          // maxWidth: 700
                                        ),
                                        margin: EdgeInsets.only(right: 20),
                                        child: BarChart(
                                          BarChartData(
                                            barGroups: _barGroups,
                                            maxY: _maxY,
                                            titlesData: FlTitlesData(
                                              bottomTitles: AxisTitles(
                                                sideTitles: SideTitles(
                                                  showTitles: true,
                                                  reservedSize: 100,
                                                  getTitlesWidget:
                                                      (
                                                        double value,
                                                        TitleMeta meta,
                                                      ) {
                                                        return SideTitleWidget(
                                                          meta: meta,
                                                          space: 35,
                                                          child: Transform.rotate(
                                                            angle:
                                                                90 * (pi / 180),
                                                            child: Text(
                                                              _chartList[value
                                                                      .toInt()]['date']
                                                                  .toString()
                                                                  .substring(
                                                                    0,
                                                                    11,
                                                                  ),
                                                            ),
                                                          ),
                                                        );
                                                      },
                                                ),
                                              ),
                                              topTitles: AxisTitles(),
                                              rightTitles: AxisTitles(),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              SizedBox(height: 20),
                            ],
                          ),
                        ),
                      ),
                    ),
                    if (width > 810)
                      Container(
                        height: height,
                        width: (width - 770) / 2,
                        color: Colors.white,
                      ),
                    if (width > 810)
                      Positioned(
                        right: 0,
                        child: Container(
                          height: height,
                          width: (width - 770) / 2,
                          color: Colors.white,
                        ),
                      ),
                  ],
                ),
              ),
            ),
            bottomNavigationBar: SafeArea(child: Footer(currentIndex: 1)),
          );
  }
}
