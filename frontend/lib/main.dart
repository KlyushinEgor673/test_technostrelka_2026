import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:frontend/pages/home.dart';
import 'package:frontend/pages/otp.dart';
import 'package:frontend/pages/youmoney.dart';

void main() {
  runApp(
    ScreenUtilInit(
      designSize: const Size(428, 926),
      builder: (_, _) => MaterialApp(
        initialRoute: '/youmoney',
        onGenerateRoute: (settings) {
          switch (settings.name) {
            case '/entrance':
              return PageRouteBuilder(pageBuilder: (_, __, ___) => Home());
            case '/otp':
              return PageRouteBuilder(pageBuilder: (_, __, ___) => Otp());
            case '/youmoney':
              return PageRouteBuilder(pageBuilder: (_, __, ___) => Youmoney());
          }
        },
      ),
    ),
  );
}
