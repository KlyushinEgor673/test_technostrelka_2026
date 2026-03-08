import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class YoomoneyButton extends StatelessWidget {
  const YoomoneyButton({
    super.key,
    required this.isCircular,
    required this.isActive,
    required this.onTap,
  });

  final bool isCircular;
  final bool isActive;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final orientation = MediaQuery.of(context).orientation;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: orientation == Orientation.portrait ? 50.h : 50,
        margin: EdgeInsets.symmetric(
          horizontal: orientation == Orientation.portrait ? 20.w : 20,
        ),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          color: isActive
              ? Color.fromRGBO(104, 51, 235, 1)
              : Color.fromRGBO(154, 117, 246, 1.0),
        ),
        child: Center(
          child: isCircular
              ? CircularProgressIndicator(strokeWidth: 1, color: Colors.grey)
              : Text(
                  'Далее',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: orientation == Orientation.portrait ? 16.sp : 16,
                  ),
                ),
        ),
      ),
    );
  }
}
