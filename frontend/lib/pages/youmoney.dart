import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:s_webview/s_webview.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class Youmoney extends StatefulWidget {
  const Youmoney({super.key});

  @override
  State<Youmoney> createState() => _YoumoneyState();
}

class _YoumoneyState extends State<Youmoney> {
  late final authUrl;

  Future<void> _init() async {
    if (Uri.base.queryParameters.containsKey('code')){
      print('Aaaaaaaaaaa');
      final dio = Dio();
      final response = await dio.post(
          'http://localhost:3000/api/exchange-token',  // или ваш реальный сервер
          data: {'code': Uri.base.queryParameters['code']}
      );

      print(response.data);
    } else {
      final url = Uri.parse(
        'https://yoomoney.ru/oauth/authorize?'
            'client_id=6EFCC0255452172DD4C176A7429F2D4F71AFDE69F3EEAA18DFCCA727903F01F2'
            '&response_type=code'
            '&redirect_uri=https://localhost.ru:8080'
            '&scope=account-info%20operation-history%20operation-details%20incoming-transfers%20payment-p2p%20payment-shop',
      );

      if (await canLaunchUrl(url)) {
        await launchUrl(url, mode: LaunchMode.externalApplication);
      }
    }
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
    );
  }
}
