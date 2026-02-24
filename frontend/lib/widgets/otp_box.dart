import 'package:flutter/material.dart';

class OtpBox extends StatelessWidget {
  const OtpBox({super.key, required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 50,
      height: 50,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        color: Color.fromRGBO(240, 240, 240, 1),
      ),
      child: Center(child: Text(text)),
    );
  }
}
