import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class InputYoomoney extends StatefulWidget {
  const InputYoomoney({
    super.key,
    required this.controller,
    required this.isPassword,
    required this.hintText,
  });

  final bool isPassword;

  final TextEditingController controller;
  final String hintText;

  @override
  State<InputYoomoney> createState() => _InputYoomoneyState();
}

class _InputYoomoneyState extends State<InputYoomoney> {
  late bool _isPassword;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    setState(() {
      _isPassword = widget.isPassword;
    });
  }

  @override
  Widget build(BuildContext context) {
    final orientation = MediaQuery.of(context).orientation;
    return Container(
      constraints: BoxConstraints(
        maxWidth: 700
      ),
      height: orientation == Orientation.portrait ? 50.h : 50,
      margin: EdgeInsets.symmetric(
        horizontal: orientation == Orientation.portrait ? 20.w : 20,
      ),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Color.fromRGBO(228, 228, 240, 1), width: 3),
      ),
      child: Row(
        children: [
          SizedBox(width: orientation == Orientation.portrait ? 14.w : 14),
          Expanded(
            child: TextField(
              style: TextStyle(
                fontSize: orientation == Orientation.portrait ? 16.sp : 16,
              ),
              obscureText: _isPassword,
              controller: widget.controller,
              decoration: InputDecoration(
                border: InputBorder.none,
                hintText: widget.hintText,
                hintStyle: TextStyle(
                  fontSize: orientation == Orientation.portrait ? 16.sp : 16,
                  color: Colors.grey
                )
              ),
            ),
          ),
          SizedBox(width: orientation == Orientation.portrait ? 14.w : 14),
        ],
      ),
    );
  }
}
