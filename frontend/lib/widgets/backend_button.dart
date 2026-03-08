import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class BackendButton extends StatelessWidget {
  const BackendButton({
    super.key,
    required this.text,
    required this.isLoading,
    required this.onPressed,
  });

  final String text;
  final bool isLoading;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    final orientation = MediaQuery.of(context).orientation;
    return Container(
      margin: EdgeInsets.symmetric(
        horizontal: orientation == Orientation.portrait ? 20.w : 20,
      ),
      height: orientation == Orientation.portrait ? 50.h : 50,
      child: FilledButton(
        onPressed: onPressed,
        style: FilledButton.styleFrom(
          backgroundColor: isLoading
              ? Color.fromRGBO(89, 65, 174, 0.5)
              : Color.fromRGBO(89, 65, 174, 1),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
        ),
        child: isLoading
            ? Center(
                child: SizedBox(
                  height: orientation == Orientation.portrait ? 30.h : 30,
                  width: orientation == Orientation.portrait ? 30.h : 30,
                  child: CircularProgressIndicator(
                    color: Color.fromRGBO(89, 65, 174, 1),
                  ),
                ),
              )
            : Text(
                text,
                style: TextStyle(
                  fontSize: orientation == Orientation.portrait ? 16.sp : 16,
                ),
              ),
      ),
    );
  }
}
