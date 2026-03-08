import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class Footer extends StatelessWidget {
  const Footer({super.key, required this.currentIndex});

  final int currentIndex;

  @override
  Widget build(BuildContext context) {
    final orientation = MediaQuery.of(context).orientation;
    if (MediaQuery.of(context).size.width > 845 &&
        !(Platform.isAndroid || Platform.isIOS)) {
      return SizedBox.shrink();
    }
    return Container(
      height: orientation == Orientation.portrait ? 70.h : 70,
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Color.fromRGBO(160, 160, 160, 0.3),
            offset: Offset(0, -0.5),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              IconButton(
                onPressed: () {},
                icon: Icon(
                  Icons.receipt,
                  size: 30,
                  color: currentIndex == 0
                      ? Color.fromRGBO(89, 65, 174, 1)
                      : null,
                ),
              ),
              IconButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/charts');
                },
                icon: Icon(
                  Icons.ssid_chart,
                  size: 30,
                  color: currentIndex == 1
                      ? Color.fromRGBO(89, 65, 174, 1)
                      : null,
                ),
              ),
              IconButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/subscriptions');
                },
                icon: Icon(
                  Icons.subscriptions,
                  size: 30,
                  color: currentIndex == 2
                      ? Color.fromRGBO(89, 65, 174, 1)
                      : null,
                ),
              ),
              IconButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/profile');
                },
                icon: Icon(
                  Icons.person,
                  size: 30,
                  color: currentIndex == 3
                      ? Color.fromRGBO(89, 65, 174, 1)
                      : null,
                ),
              ),
            ],
          ),
        ],
      ),
      // BottomNavigationBar(
      //   type: BottomNavigationBarType.fixed,
      //   elevation: 0,
      //   backgroundColor: Colors.white,
      //   selectedItemColor: Color.fromRGBO(89, 65, 174, 1),
      //   items: [
      //     BottomNavigationBarItem(
      //       icon: Icon(Icons.receipt, size: 30),
      //       label: '',
      //     ),
      //     BottomNavigationBarItem(
      //       icon: Icon(Icons.ssid_chart, size: 30),
      //       label: '',
      //     ),
      //     BottomNavigationBarItem(
      //       icon: Icon(Icons.subscriptions, size: 30),
      //       label: '',
      //     ),
      //     BottomNavigationBarItem(icon: Icon(Icons.person, size: 30,),
      //         label: ''
      //     ),
      //   ],
      //   currentIndex: currentIndex,
      //   onTap: (value) {
      //     if (value == 1) {
      //       Navigator.pushNamed(context, '/charts');
      //     } else if (value == 2) {
      //       Navigator.pushNamed(context, '/subscriptions');
      //     }
      //     if (value == 3) {
      //       Navigator.pushNamed(context, '/profile');
      //     }
      //   },
      // ),
    );
  }
}
