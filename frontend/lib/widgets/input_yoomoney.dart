import 'package:flutter/material.dart';

class InputYoomoney extends StatelessWidget {
  const InputYoomoney({super.key, required this.controller});

  final TextEditingController controller;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 42,
      margin: EdgeInsets.symmetric(horizontal: 20),
      constraints: BoxConstraints(maxWidth: 500),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Color.fromRGBO(228, 228, 240, 1), width: 3),
      ),
      child: Center(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 14),
          child: TextField(controller: controller),
        ),
      ),
    );
  }
}
