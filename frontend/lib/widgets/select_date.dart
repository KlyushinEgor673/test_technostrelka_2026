import 'package:flutter/material.dart';

class SelectDate extends StatefulWidget {
  const SelectDate({
    super.key,
    required this.hintText,
    required this.change,
    required this.firstDate,
    required this.lastDate, this.value,
  });

  final String hintText;
  final ValueChanged change;
  final DateTime firstDate;
  final DateTime lastDate;
  final String? value;

  @override
  State<SelectDate> createState() => _SelectDateState();
}

class _SelectDateState extends State<SelectDate> {
  String? value;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    if (widget.value != null){
      setState(() {
        value = widget.value.toString().substring(0, 10);
      });
    }
    print(value);
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      child: Container(
        height: 50,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          color: Color.fromRGBO(240, 240, 240, 1),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(width: 14),
            Text(
              value ?? widget.hintText,
              style: TextStyle(
                color: value != null ? Colors.black : Colors.grey,
                fontSize: 16
              ),
            ),
          ],
        ),
      ),
      onTap: () async {
        final res = await showDatePicker(
          context: context,
          firstDate: widget.firstDate,
          lastDate: widget.lastDate,
        );
        setState(() {
          value = res.toString().substring(0, 11);
        });
        widget.change(value.toString().substring(0, 11));
      },
    );
  }
}
