import 'package:flutter/material.dart';

class BoxOtp extends StatelessWidget {
  const BoxOtp({super.key, required this.char});
  final String char;

  @override
  Widget build(BuildContext context) {
    final orientation = MediaQuery.of(context).orientation;
    return Container(
      width: 45,
      height: 55,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          color: Color.fromRGBO(240, 240, 240, 1)
      ),
      child: Center(
        child: Text(char),
      ),
    );
  }
}
