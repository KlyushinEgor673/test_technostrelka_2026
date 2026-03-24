import 'dart:convert';
import 'dart:math';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/widgets/backend_button.dart';
import 'package:frontend/widgets/footer.dart';
import 'package:frontend/widgets/header.dart';
import 'package:frontend/widgets/select_date.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:provider/provider.dart';

class Charts extends StatefulWidget {
  const Charts({super.key});

  @override
  State<Charts> createState() => _ChartsState();
}

class _ChartsState extends State<Charts> {
  late final _dio;
  final _storage = FlutterSecureStorage();
  List<BarChartGroupData> _barGroups = [];
  String? _startDate;
  String? _endDate;
  double _maxY = 0;
  List _chartList = [];
  List _subsYoomoney = [];
  bool _isLoaded = false;
  bool _isCan = false;
  List<PieChartSectionData> _sectionsPie = [];
  List _categories = [];
  String _radioValue = 'all';
  String _chartValue = 'bar';
  List _legendList = [];
  int? _touchedIndex = -1;
  double _price = 0;
  int _countDays = 1;

  void _checkCan() {
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
    // _legendList = [];
    _maxY = 0;
    _barGroups = [];
    _price = 0;
    String? token = await _storage.read(key: 'token');
    final response = await _dio.get(
      '/api/subscription/history',
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
    final List debSubscriptions = response.data['debSubscriptions'];
    if (_subsYoomoney.length != 0) {
      for (final sub in _subsYoomoney) {
        debSubscriptions.add({
          'date': sub['date'],
          'category_id': 0,
          'price': sub['price'].toString(),
        });
      }
    }
    _countDays = DateTime.parse(
      _endDate!,
    ).difference(DateTime.parse(_startDate!)).inDays;
    int countDays = DateTime.parse(
      _endDate!,
    ).difference(DateTime.parse(_startDate!)).inDays;
    DateTime startDate = DateTime.parse(_startDate!);
    _chartList = [];
    final _mapDates = {};
    if (_radioValue == 'all') {
      for (int i = 0; i < countDays + 1; ++i) {
        DateTime date = startDate.add(Duration(days: i));
        _chartList.add({'date': date});
        _mapDates[date] = 0;
        for (final history in debSubscriptions) {
          final timestapz = DateTime.parse(history['date']);
          final dateTimeDB = DateTime(
            timestapz.year,
            timestapz.month,
            timestapz.day,
          );
          if (dateTimeDB == date) {
            _mapDates[date] = _mapDates[date] + double.parse(history['price']);
            _price += double.parse(history['price']);
          }
        }
        if (_maxY < _mapDates[date]) {
          _maxY = _mapDates[date];
        }
        _barGroups.add(
          BarChartGroupData(
            x: i,
            barRods: [BarChartRodData(toY: (_mapDates[date] as num).toDouble())],
          ),
        );
      }
      _sectionsPie = [];
    } else {
      _sectionsPie = [];
      Map<int, double> pieMap = {};
      for (int i = 0; i < countDays + 1; ++i) {
        DateTime date = startDate.add(Duration(days: i));
        _chartList.add({'date': date});
        _mapDates[date] = 0;
        for (final history in debSubscriptions) {
          final timestapz = DateTime.parse(history['date']);
          final dateTimeDB = DateTime(
            timestapz.year,
            timestapz.month,
            timestapz.day,
          );
          if (dateTimeDB == date) {
            if (pieMap.keys.contains(history['category_id'])) {
              pieMap[history['category_id']] =
                  pieMap[history['category_id']]! +
                  double.parse(history['price']);
              _price += double.parse(history['price']);
            } else {
              pieMap[history['category_id']] = double.parse(history['price']);
            }
          }
        }
      }
      int i = 0;
      List legendListCopy = [];
      for (final key in pieMap.keys) {
        late String color;
        late bool use;
        late String name;
        for (final category in _categories) {
          if (category['id'] == key) {
            color = category['color'];
            use = category['value'];
            name = category['name'];
            break;
          }
        }
        if (use) {
          _sectionsPie.add(
            PieChartSectionData(
              value: double.parse(pieMap[key].toString()),
              color: HexColor(color),
              radius: i == _touchedIndex ? 50 : 40,
            ),
          );
          legendListCopy.add({'color': color, 'name': name});
          i++;
        }
      }
      _legendList = legendListCopy;
      print('legend ${_legendList}');
      for (int i = 0; i < countDays + 1; ++i) {
        DateTime date = startDate.add(Duration(days: i));
        _chartList.add({'date': date});
        List<BarChartRodData> barRods = [];
        for (final history in debSubscriptions) {
          final timestapz = DateTime.parse(history['date']);
          final dateTimeDB = DateTime(
            timestapz.year,
            timestapz.month,
            timestapz.day,
          );
          late String color;
          late bool use;
          for (final category in _categories) {
            if (category['id'] == history['category_id']) {
              color = category['color'];
              use = category['value'];
              break;
            }
          }
          if (dateTimeDB == date && use) {
            final price = double.parse(history['price']);
            if (price > _maxY) {
              _maxY = price;
            }
            barRods.add(BarChartRodData(toY: price, color: HexColor(color)));
          }
        }
        final barChartGroupData = BarChartGroupData(x: i, barRods: barRods);
        _barGroups.add(barChartGroupData);
      }
    }
    setState(() {});
  }

  Future<void> _init() async {
    String? token = await _storage.read(key: 'token');
    final response = await _dio.get(
      '/api/user/me',
      options: Options(headers: {'authorization': 'Bearer $token'}),
    );
    final responseCategories = await _dio.get(
      '/api/subscription/category',
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
    _categories = responseCategories.data['categories'];
    for (int i = 0; i < _categories.length; ++i) {
      _categories[i]['value'] = true;
    }
    if (response.data['user']['is_enter_ym']) {
      _categories.add({
        'id': 0,
        'name': 'юMoney',
        'color': '#6733ea',
        'value': true,
      });
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
            appBar: MediaQuery.of(context).size.width < 810
                ? AppBar(
                    actions: [
                      Builder(
                        builder: (BuildContext context) {
                          return IconButton(
                            onPressed: () {
                              Scaffold.of(context).openEndDrawer();
                            },
                            icon: Icon(Icons.tune),
                          );
                        },
                      ),
                    ],
                    leading: SizedBox.shrink(),
                    backgroundColor: Colors.white,
                    surfaceTintColor: Colors.white,
                  )
                : MediaQuery.of(context).size.width < 845 ||
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
                      child: SizedBox(
                        width: double.infinity,
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
                                        value: _startDate,
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
                                        value: _endDate,
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
                                if (width < 810) SizedBox(height: 20),
                                if (width < 810)
                                  Center(
                                    child: Container(
                                      constraints: BoxConstraints(
                                        maxWidth: 500,
                                      ),
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
                                          width: 232,
                                          child: SelectDate(
                                            hintText: 'Выберете начальную дату',
                                            value: _startDate,
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
                                          width: 232,
                                          child: SelectDate(
                                            hintText: 'Выберете конечную дату',
                                            value: _endDate,
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
                                          width: 232,
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
                                        SizedBox(width: 10),
                                        Builder(
                                          builder: (BuildContext context) {
                                            return IconButton(
                                              onPressed: () {
                                                Scaffold.of(
                                                  context,
                                                ).openEndDrawer();
                                              },
                                              icon: Icon(Icons.tune),
                                            );
                                          },
                                        ),
                                      ],
                                    ),
                                  ),
                                SizedBox(height: 20),
                              ],
                            ),
                            if (_radioValue == 'all' || _chartValue == 'bar')
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
                                        ),
                                        margin: EdgeInsets.only(right: 20),
                                        child: BarChart(
                                          BarChartData(
                                            barGroups: _barGroups,
                                            maxY: _maxY * 1.2,
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
                            if (_sectionsPie.length != 0 &&
                                _chartValue == 'pie')
                              Center(
                                child: Container(
                                  margin: EdgeInsets.only(left: 20, right: 20),
                                  constraints: BoxConstraints(maxWidth: 650),
                                  width: 770,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(30),
                                    color: Colors.white,
                                    border: Border.all(
                                      color: Color.fromRGBO(244, 244, 244, 1),
                                      width: 1,
                                    ),
                                    boxShadow: [
                                      BoxShadow(
                                        color: Color.fromRGBO(
                                          228,
                                          232,
                                          245,
                                          0.6,
                                        ),
                                        blurRadius: 20,
                                      ),
                                    ],
                                  ),
                                  padding: EdgeInsets.symmetric(vertical: 30),
                                  child: MediaQuery.of(context).size.width < 610
                                      ? Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          children: [
                                            SizedBox(
                                              width: 300,
                                              height: 300,
                                              child: PieChart(
                                                PieChartData(
                                                  sections: _sectionsPie,
                                                  pieTouchData: PieTouchData(
                                                    touchCallback:
                                                        (
                                                          event,
                                                          pieTouchResponse,
                                                        ) async {
                                                          if (!event
                                                                  .isInterestedForInteractions ||
                                                              pieTouchResponse ==
                                                                  null ||
                                                              pieTouchResponse
                                                                      .touchedSection ==
                                                                  null) {
                                                            _touchedIndex = -1;
                                                            return;
                                                          } else {
                                                            setState(() {
                                                              _touchedIndex =
                                                                  pieTouchResponse
                                                                      ?.touchedSection!
                                                                      .touchedSectionIndex;
                                                            });
                                                            await _buildChart();
                                                          }
                                                        },
                                                  ),
                                                ),
                                              ),
                                            ),
                                            Column(
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              mainAxisAlignment:
                                                  MainAxisAlignment.center,
                                              children: List.generate(
                                                _legendList.length,
                                                (i) => Container(
                                                  margin: EdgeInsets.symmetric(
                                                    horizontal: 20,
                                                  ),
                                                  child: Row(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment.start,
                                                    children: [
                                                      if (i != _touchedIndex)
                                                        SizedBox(width: 5),
                                                      Container(
                                                        width:
                                                            i == _touchedIndex
                                                            ? 20
                                                            : 15,
                                                        height:
                                                            i == _touchedIndex
                                                            ? 20
                                                            : 15,
                                                        color: HexColor(
                                                          _legendList[i]['color'],
                                                        ),
                                                      ),
                                                      SizedBox(width: 5),
                                                      Text(
                                                        // 'name $i $_touchedIndex',
                                                        _legendList[i]['name'],
                                                        style: TextStyle(
                                                          color:
                                                              i == _touchedIndex
                                                              ? Colors.black
                                                              : Colors.grey,
                                                          fontWeight:
                                                              i == _touchedIndex
                                                              ? FontWeight.w600
                                                              : FontWeight.w400,
                                                        ),
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ],
                                        )
                                      : Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          children: [
                                            SizedBox(
                                              width: 300,
                                              height: 300,
                                              child: PieChart(
                                                PieChartData(
                                                  sections: _sectionsPie,
                                                  pieTouchData: PieTouchData(
                                                    touchCallback:
                                                        (
                                                          event,
                                                          pieTouchResponse,
                                                        ) async {
                                                          if (!event
                                                                  .isInterestedForInteractions ||
                                                              pieTouchResponse ==
                                                                  null ||
                                                              pieTouchResponse
                                                                      .touchedSection ==
                                                                  null) {
                                                            _touchedIndex = -1;
                                                            return;
                                                          } else {
                                                            setState(() {
                                                              _touchedIndex =
                                                                  pieTouchResponse
                                                                      ?.touchedSection!
                                                                      .touchedSectionIndex;
                                                            });
                                                            await _buildChart();
                                                          }
                                                        },
                                                  ),
                                                ),
                                              ),
                                            ),
                                            Column(
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              mainAxisAlignment:
                                                  MainAxisAlignment.center,
                                              children: List.generate(
                                                _legendList.length,
                                                (i) => Container(
                                                  margin: EdgeInsets.symmetric(
                                                    horizontal: 20,
                                                  ),
                                                  child: Row(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment.start,
                                                    children: [
                                                      if (i != _touchedIndex)
                                                        SizedBox(width: 5),
                                                      Container(
                                                        width:
                                                            i == _touchedIndex
                                                            ? 20
                                                            : 15,
                                                        height:
                                                            i == _touchedIndex
                                                            ? 20
                                                            : 15,
                                                        color: HexColor(
                                                          _legendList[i]['color'],
                                                        ),
                                                      ),
                                                      SizedBox(width: 5),
                                                      Text(
                                                        // 'name $i $_touchedIndex',
                                                        _legendList[i]['name'],
                                                        style: TextStyle(
                                                          color:
                                                              i == _touchedIndex
                                                              ? Colors.black
                                                              : Colors.grey,
                                                          fontWeight:
                                                              i == _touchedIndex
                                                              ? FontWeight.w600
                                                              : FontWeight.w400,
                                                        ),
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                ),
                              ),
                            SizedBox(height: 20),
                            if (_radioValue == 'categories' &&
                                _chartValue == 'bar')
                              Container(
                                margin: EdgeInsets.only(
                                  left: 20,
                                  right: 20,
                                  bottom: 20,
                                ),
                                width: 770,
                                child: Column(
                                  children: List.generate(_legendList.length, (
                                    i,
                                  ) {
                                    return SizedBox(
                                      width: 770,
                                      child: Row(
                                        children: [
                                          Container(
                                            width: 15,
                                            height: 15,
                                            color: HexColor(
                                              _legendList[i]['color'],
                                            ),
                                          ),
                                          SizedBox(width: 5),
                                          Text(_legendList[i]['name']),
                                        ],
                                      ),
                                    );
                                  }),
                                ),
                              ),
                            if (_price != 0)
                              Center(
                                child: Container(
                                  width: 770,
                                  margin: EdgeInsets.symmetric(horizontal: 20),
                                  child: Text(
                                    'Потратили: $_price₽ . В месяц ${((_price / _countDays * 30)).toStringAsFixed(2)}₽. В год  ${(_price / _countDays * 365).toStringAsFixed(2)}',
                                    style: TextStyle(
                                      fontSize: 18
                                    ),
                                  ),
                                ),
                              ),
                            SizedBox(height: 20),
                          ],
                        ),
                      ),
                    ),
                    if (width > 810 && _chartValue == 'bar')
                      IgnorePointer(
                        child: Container(
                          height: height,
                          width: (width - 770) / 2,
                          color: Colors.white,
                        ),
                      ),
                    if (width > 810 && _chartValue == 'bar')
                      Positioned(
                        right: 0,
                        child: IgnorePointer(
                          child: Container(
                            height: height,
                            width: (width - 770) / 2,
                            color: Colors.white,
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),
            bottomNavigationBar: SafeArea(child: Footer(currentIndex: 1)),
            endDrawer: Drawer(
              backgroundColor: Colors.white,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    margin: EdgeInsets.only(left: 10, top: 10),
                    child: Text(
                      'Параметры',
                      style: TextStyle(
                        fontWeight: FontWeight.w700,
                        fontSize: 24,
                      ),
                    ),
                  ),
                  RadioGroup(
                    groupValue: _radioValue,
                    onChanged: (value) async {
                      if (value != null) {
                        setState(() {
                          _radioValue = value;
                        });
                      }
                      await _buildChart();
                    },
                    child: Row(
                      // crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            SizedBox(width: 5),
                            Radio(
                              value: 'all',
                              activeColor: Color.fromRGBO(89, 65, 174, 1),
                            ),
                            Text('Общее'),
                          ],
                        ),
                        SizedBox(width: 20),
                        Row(
                          children: [
                            SizedBox(width: 5),
                            Radio(
                              value: 'categories',
                              activeColor: Color.fromRGBO(89, 65, 174, 1),
                            ),
                            Text('Категории'),
                          ],
                        ),
                      ],
                    ),
                  ),
                  if (_radioValue == 'categories')
                    RadioGroup(
                      groupValue: _chartValue,
                      onChanged: (value) async {
                        if (value != null) {
                          setState(() {
                            _chartValue = value;
                          });
                        }
                        await _buildChart();
                      },
                      child: Row(
                        children: [
                          SizedBox(width: 5),
                          Radio(
                            value: 'bar',
                            activeColor: Color.fromRGBO(89, 65, 174, 1),
                          ),
                          SizedBox(width: 5),
                          Text('Столбчатая'),
                          SizedBox(width: 20),
                          Radio(
                            value: 'pie',
                            activeColor: Color.fromRGBO(89, 65, 174, 1),
                          ),
                          SizedBox(width: 5),
                          Text('Круговая'),
                        ],
                      ),
                    ),
                  if (_radioValue == 'categories')
                    Expanded(
                      // height: 300,
                      child: ListView.builder(
                        itemCount: _categories.length,
                        itemBuilder: (context, i) {
                          return Row(
                            children: [
                              Checkbox(
                                activeColor: Color.fromRGBO(89, 65, 174, 1),
                                value: _categories[i]['value'],
                                onChanged: (value) async {
                                  setState(() {
                                    _categories[i]['value'] =
                                        !_categories[i]['value'];
                                  });
                                  await _buildChart();
                                },
                              ),
                              SizedBox(height: 5),
                              Text(_categories[i]['name']),
                            ],
                          );
                        },
                      ),
                    ),
                ],
              ),
            ),
          );
  }
}
