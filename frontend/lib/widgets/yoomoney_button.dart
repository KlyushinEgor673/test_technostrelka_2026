import 'package:flutter/material.dart';

class YoomoneyButton extends StatelessWidget {
  const YoomoneyButton({super.key, required this.isCircular, required this.isActive, required this.onTap});
  final bool isCircular;
  final bool isActive;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 50,
        margin: EdgeInsets.symmetric(horizontal: 20),
        constraints: BoxConstraints(maxWidth: 500),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          color: isActive
              ? Color.fromRGBO(104, 51, 235, 1)
              : Color.fromRGBO(154, 117, 246, 1.0),
        ),
        child: Center(
          child: isCircular
              ? CircularProgressIndicator(
            strokeWidth: 1,
            color: Colors.grey,
          )
              : Text('Далее', style: TextStyle(color: Colors.white)),
        ),
      ),
    );
  }
}
