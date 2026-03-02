import 'package:flutter/material.dart';
import 'package:frontend/widgets/input_yoomoney.dart';

class Yoomoney extends StatefulWidget {
  const Yoomoney({super.key});

  @override
  State<Yoomoney> createState() => _YoomoneyState();
}

class _YoomoneyState extends State<Yoomoney> {
  final _controllerEmail = TextEditingController();
  final _controllerPassword = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          InputYoomoney(controller: _controllerEmail),
          SizedBox(height: 15,),
          InputYoomoney(controller: _controllerPassword),
          SizedBox(height: 15,),
          GestureDetector(
            child: Container(
              height: 42,
              margin: EdgeInsets.symmetric(horizontal: 20),
              constraints: BoxConstraints(
                  maxWidth: 500
              ),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                color: Color.fromRGBO(104, 51, 235, 1)
              ),
              child: Center(
                child: Text('Далее', style: TextStyle(color: Colors.white),),
              ),
            ),
          )
        ],
      ),
    );
  }
}
