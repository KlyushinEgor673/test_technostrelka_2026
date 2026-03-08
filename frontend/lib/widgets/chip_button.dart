import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ChipButton extends StatelessWidget {
  const ChipButton({
    super.key,
    required this.text,
    required this.isActive,
    required this.onTap,
  });

  final String text;
  final bool isActive;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final orientation = MediaQuery.of(context).orientation;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: orientation == Orientation.portrait ? 48.h : 48,
        padding: EdgeInsets.symmetric(
          horizontal: orientation == Orientation.portrait ? 20.w : 20,
        ),
        decoration: BoxDecoration(
          color: isActive
              ? Color.fromRGBO(89, 65, 174, 1)
              : Color.fromRGBO(245, 245, 249, 1),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Center(
          child: Text(
            text,
            style: TextStyle(
              color: isActive ? Colors.white : Color.fromRGBO(126, 126, 154, 1),
              fontSize: orientation == Orientation.portrait ? 15.sp : 15,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
      ),
    );
  }
}
