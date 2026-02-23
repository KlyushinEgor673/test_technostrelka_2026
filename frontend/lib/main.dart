import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:frontend/pages/home.dart';

void main() {
  runApp(
    ScreenUtilInit(
      designSize: const Size(428, 926),
      builder: (_, _) => MaterialApp(
        initialRoute: '/entrance',
        onGenerateRoute: (settings) {
          switch (settings.name) {
            case '/entrance':
              return PageRouteBuilder(pageBuilder: (_, __, ___) => Home());
          }
        },
      ),
    ),
  );
}
