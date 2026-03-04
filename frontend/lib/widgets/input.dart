import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

enum InputTypeCustom {inputText, inputInt, inputDouble}

class Input extends StatefulWidget {
  const Input({
    super.key,
    required this.isPassword,
    required this.hintText,
    required this.controller, required this.type,
  });

  final String hintText;
  final bool isPassword;
  final TextEditingController controller;
  final InputTypeCustom type;

  @override
  State<Input> createState() => _InputState();
}

class _InputState extends State<Input> {
  late bool _isPassword;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _isPassword = widget.isPassword;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 50,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        color: Color.fromRGBO(240, 240, 240, 1),
      ),
      child: Row(
        children: [
          SizedBox(width: 14),
          Expanded(
            child: TextField(
              keyboardType: widget.type != InputTypeCustom.inputText ? TextInputType.number : null,
              inputFormatters: [],
              style: TextStyle(fontSize: 16),
              controller: widget.controller,
              obscureText: _isPassword,
              decoration: InputDecoration(
                border: InputBorder.none,
                hintText: widget.hintText,
                hintStyle: TextStyle(color: Colors.grey, fontSize: 16),
              ),
            ),
          ),
          if (widget.isPassword)
            IconButton(
              onPressed: () {
                setState(() {
                  _isPassword = !_isPassword;
                });
              },
              icon: Icon(
                _isPassword ? Icons.visibility_off : Icons.visibility,
                color: Colors.grey,
              ),
            ),
          SizedBox(width: 14),
        ],
      ),
    );
  }
}
