import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:frontend/pages/change_profile.dart';
import 'package:frontend/pages/create_subscription.dart';
import 'package:frontend/pages/home.dart';
import 'package:frontend/pages/otp.dart';
import 'package:frontend/pages/profile.dart';
import 'package:frontend/pages/subscriptions.dart';
import 'package:frontend/pages/yoomoney.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final storage = FlutterSecureStorage();
  String? token = await storage.read(key: 'token');
  runApp(
    ScreenUtilInit(
      designSize: const Size(428, 926),
      builder: (_, _) => MaterialApp(
        // locale: Locale('ru'),
        theme: ThemeData(
          datePickerTheme: DatePickerThemeData(backgroundColor: Colors.white),
        ),
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
            case '/yoomoney':
              return PageRouteBuilder(pageBuilder: (_, __, ___) => Yoomoney());
            case '/subscriptions':
              return PageRouteBuilder(
                pageBuilder: (_, __, ___) => Subscriptions(),
              );
            case '/create_subscription':
              final args = settings.arguments as Map;
              return PageRouteBuilder(
                pageBuilder: (_, __, ___) => CreateSubscription(id: args['id']),
              );
            case '/change_profile':
              return PageRouteBuilder(
                pageBuilder: (_, __, ___) => ChangeProfile(),
              );
          }
        },
      ),
    ),
  );
}
