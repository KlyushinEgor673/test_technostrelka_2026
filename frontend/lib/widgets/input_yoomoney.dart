import 'package:flutter/material.dart';

class InputYoomoney extends StatefulWidget {
  const InputYoomoney({
    super.key,
    required this.controller,
    required this.isPassword,
  });

  final bool isPassword;

  final TextEditingController controller;

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
    return Container(
      height: 50,
      margin: EdgeInsets.symmetric(horizontal: 20),
      constraints: BoxConstraints(maxWidth: 500),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Color.fromRGBO(228, 228, 240, 1), width: 3),
      ),
      child: Row(
        children: [
          SizedBox(width: 14),
          Expanded(
            child: TextField(
              obscureText: _isPassword,
              controller: widget.controller,
              decoration: InputDecoration(border: InputBorder.none),
            ),
          ),
          SizedBox(width: 14),
        ],
      ),
    );
  }
}
