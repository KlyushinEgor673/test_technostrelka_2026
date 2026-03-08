import 'dart:math';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
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

  Future<void> _init() async {}

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
      backgroundColor: Colors.white,
      body: SafeArea(
        child: ListView(
          children: [
            Header(id: 3),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: orientation == Orientation.portrait ? 20.h : 20,
                ),
                Container(
                  constraints: BoxConstraints(
                    minWidth: orientation == Orientation.portrait ? 500.w : 500,
                  ),
                  margin: EdgeInsets.only(
                    left: orientation == Orientation.portrait ? 20.w : 20,
                    right: orientation == Orientation.portrait ? 20.w : 20,
                    bottom: orientation == Orientation.portrait ? 20.h : 20,
                  ),
                  child: SelectDate(
                    hintText: 'Выберете начальную дату',
                    change: (newValue) {
                      _startDate = newValue;
                    },
                    firstDate: DateTime(1990),
                    lastDate: DateTime(2100),
                  ),
                ),
                Container(
                  constraints: BoxConstraints(minWidth: 500),
                  margin: EdgeInsets.only(
                    left: orientation == Orientation.portrait ? 20.w : 20,
                    right: orientation == Orientation.portrait ? 20.w : 20,
                    bottom: orientation == Orientation.portrait ? 20.h : 20,
                  ),
                  child: SelectDate(
                    hintText: 'Выберете начальную дату',
                    change: (newValue) {
                      _endDate = newValue;
                    },
                    firstDate: DateTime(1990),
                    lastDate: DateTime(2100),
                  ),
                ),
              ],
            ),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              clipBehavior: Clip.none,
              child: Container(
                height: orientation == Orientation.portrait ? 480.h : 480,
                width: _chartList.length * 30,
                constraints: BoxConstraints(
                  minWidth:
                      MediaQuery.of(context).size.width -
                      (orientation == Orientation.portrait ? 20.w : 20) -
                      MediaQuery.of(context).padding.left -
                      MediaQuery.of(context).padding.right,
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
                          getTitlesWidget: (double value, TitleMeta meta) {
                            return SideTitleWidget(
                              meta: meta,
                              space: 35,
                              child: Transform.rotate(
                                angle: 90 * (pi / 180),
                                child: Text(
                                  _chartList[value.toInt()]['date']
                                      .toString()
                                      .substring(0, 11),
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
            Container(
              constraints: BoxConstraints(maxWidth: 500),
              margin: EdgeInsets.only(left: 20, right: 20),
              height: orientation == Orientation.portrait ? 50.h : 50,
              child: ChipButton(
                text: 'Построить',
                isActive: true,
                onTap: () async {
                  _maxY = 0;
                  _barGroups = [];
                  String? token = await _storage.read(key: 'token');
                  final response = await _dio.get(
                    '/api/subscription/history',
                    options: Options(
                      headers: {'Authorization': 'Bearer $token'},
                    ),
                  );
                  int countDays = DateTime.parse(
                    _endDate,
                  ).difference(DateTime.parse(_startDate)).inDays;
                  DateTime startDate = DateTime.parse(_startDate);
                  _chartList = [];
                  for (int i = 0; i < countDays + 1; ++i) {
                    DateTime date = startDate.add(Duration(days: i));
                    bool isHas = false;
                    for (final item in response.data['debSubscriptions']) {
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
                          'price': double.parse(item['price']),
                        });
                        isHas = true;
                        if (double.parse(item['price']) > _maxY) {
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
                },
              ),
            ),
            SizedBox(height: orientation == Orientation.portrait ? 20.h : 20),
          ],
        ),
      ),
      bottomNavigationBar: SafeArea(child: Footer(currentIndex: 1)),
    );
  }
}
