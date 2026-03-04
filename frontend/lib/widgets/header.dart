import 'package:flutter/material.dart';
import 'package:s_webview/s_webview.dart';

class Header extends StatefulWidget {
  const Header({super.key, required this.id});

  final int id;

  @override
  State<Header> createState() => _HeaderState();
}

class _HeaderState extends State<Header> {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            Color.fromRGBO(97, 93, 186, 1),
            Color.fromRGBO(89, 65, 174, 1),
          ],
        ),
      ),
      // margin: EdgeInsets.only(top: 15),
      padding: EdgeInsets.symmetric(vertical: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          SizedBox(width: 15),
          GestureDetector(
            child: Container(
              width: 100,
              height: 35,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(40),
                color: Colors.white,
              ),
              child: Center(
                child: Text(
                  'Аналитика',
                  style: TextStyle(
                    color: widget.id == 3
                        ? Color.fromRGBO(89, 65, 174, 1)
                        : Colors.black,
                  ),
                ),
              ),
            ),
            onTap: () {
              Navigator.pushNamed(context, '/charts');
            },
          ),
          SizedBox(width: 15),
          GestureDetector(
            child: Container(
              width: 100,
              height: 35,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(40),
                color: Colors.white,
              ),
              child: Center(
                child: Text(
                  'Подписки',
                  style: TextStyle(
                    color: widget.id == 2
                        ? Color.fromRGBO(89, 65, 174, 1)
                        : Colors.black,
                  ),
                ),
              ),
            ),
            onTap: () {
              Navigator.pushNamed(context, '/subscriptions');
            },
          ),
          SizedBox(width: 15),
          GestureDetector(
            child: Container(
              width: 100,
              height: 35,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(40),
                color: Colors.white,
              ),
              child: Center(
                child: Text(
                  'Профиль',
                  style: TextStyle(
                    color: widget.id == 1
                        ? Color.fromRGBO(89, 65, 174, 1)
                        : Colors.black,
                  ),
                ),
              ),
            ),
            onTap: () {
              Navigator.pushNamed(context, '/profile');
            },
          ),
          SizedBox(width: 15),
        ],
      ),
    );
  }
}
