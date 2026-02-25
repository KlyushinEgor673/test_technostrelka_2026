import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/pages/home.dart';
import 'package:frontend/pages/otp.dart';
import 'package:frontend/pages/profile.dart';

void main() async {
  final storage = FlutterSecureStorage();
  String? token = await storage.read(key: 'token');
  runApp(
    ScreenUtilInit(
      designSize: const Size(428, 926),
      builder: (_, _) => MaterialApp(
        initialRoute: '/',
        onGenerateRoute: (settings) {
          switch (settings.name) {
            case '/':
              if (token == null) {
                return PageRouteBuilder(pageBuilder: (_, __, ___) => Home());
              } else {
                return PageRouteBuilder(pageBuilder: (_, __, ___) => Profile());
              }
            case '/entrance':
              return PageRouteBuilder(pageBuilder: (_, __, ___) => Home());
            case '/otp':
              final args = settings.arguments as Map;
              return PageRouteBuilder(
                pageBuilder: (_, __, ___) => Otp(email: args['email']),
              );
            case '/profile':
              return PageRouteBuilder(pageBuilder: (_, __, ___) => Profile());
          }
        },
      ),
    ),
  );
}
