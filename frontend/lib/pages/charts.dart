import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/widgets/footer.dart';
import 'package:frontend/widgets/header.dart';
import 'package:frontend/widgets/select_date.dart';

import '../widgets/chip_button.dart';

class Charts extends StatefulWidget {
  const Charts({super.key});

  @override
  State<Charts> createState() => _ChartsState();
}

class _ChartsState extends State<Charts> {
  final _dio = Dio();
  final _storage = FlutterSecureStorage();
  Map _subscriptions = {};
  List<PieChartSectionData> _sections = [];
  List<BarChartGroupData> _barGroups = [];

  Future<void> _init() async {
    //
    // for (final value in response.data['subscriptions']) {
    //   if (_subscriptions[value['description']] == null) {
    //     _subscriptions[value['description']] = 1;
    //   } else {
    //     _subscriptions[value['description']] =
    //         _subscriptions[value['description']] + 1;
    //   }
    // }
    // for (final key in _subscriptions.keys) {
    //   _sections.add(
    //     PieChartSectionData(value: _subscriptions[key], title: key),
    //   );
    // }
    // setState(() {});
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
      backgroundColor: Colors.white,
      body: SafeArea(
        child: ListView(
          children: [
            Header(id: 3),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  constraints: BoxConstraints(maxWidth: 500),
                  margin: EdgeInsets.only(left: 20, right: 20, bottom: 20),
                  child: SelectDate(
                    hintText: 'Выберете начальную дату',
                    change: (newValue) {},
                    firstDate: DateTime(1990),
                    lastDate: DateTime(2100),
                  ),
                ),
                Container(
                  constraints: BoxConstraints(maxWidth: 500),
                  margin: EdgeInsets.only(left: 20, right: 20, bottom: 20),
                  child: SelectDate(
                    hintText: 'Выберете начальную дату',
                    change: (newValue) {},
                    firstDate: DateTime(1990),
                    lastDate: DateTime(2100),
                  ),
                ),
                // FilledButton(
                //   onPressed: () async {
                //     _barGroups = [];
                //     String? token = await _storage.read(key: 'token');
                //     final response = await _dio.get(
                //       'http://localhost:3000/api/subscription/',
                //       options: Options(
                //         headers: {'Authorization': 'Bearer $token'},
                //       ),
                //     );
                //     print(response.data['subscriptions']);
                //     List subscriptions = response.data['subscriptions'];
                //     for (int i = 0; i < subscriptions.length; ++i) {
                //       // if (subscriptions[i]['date_start'])
                //       _barGroups.add(
                //         BarChartGroupData(
                //           x: i,
                //           barRods: [
                //             BarChartRodData(
                //               toY: double.parse(subscriptions[i]['price']),
                //             ),
                //           ],
                //         ),
                //       );
                //     }
                //     setState(() {
                //
                //     });
                //   },
                //   child: Text('Построить'),
                // ),
              ],
            ),
            // Spacer(),
            Center(
              child: SizedBox(
                height: 500,
                child: BarChart(
                  BarChartData(
                    barGroups: _barGroups,
                    // titlesData: FlTitlesData(
                    //   bottomTitles: AxisTitles(
                    //     sideTitles: SideTitles(
                    //       showTitles: true,
                    //       getTitlesWidget: (_, __) {
                    //         return Text(':)');
                    //       },
                    //     ),
                    //   ),
                    // ),
                  ),
                ),
              ),
            ),
            Container(
              constraints: BoxConstraints(maxWidth: 500),
              margin: EdgeInsets.only(left: 20, right: 20),
              height: 50,
              child: ChipButton(
                text: 'Построить',
                isActive: true,
                onTap: () {},
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Footer(currentIndex: 0),
    );
  }
}
