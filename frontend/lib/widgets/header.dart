// import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class Header extends StatefulWidget implements PreferredSizeWidget {
  const Header({super.key, required this.id});

  final int id;

  @override
  State<Header> createState() => _HeaderState();

  @override
  Size get preferredSize => const Size.fromHeight(60);

}

class _HeaderState extends State<Header> {
  @override
  Widget build(BuildContext context) {
    if (MediaQuery.of(context).size.width < 845 ||
        defaultTargetPlatform == TargetPlatform.android ||
        defaultTargetPlatform == TargetPlatform.iOS) {
      return SizedBox.shrink();
    }
    return AppBar(
      backgroundColor: Colors.white,
      surfaceTintColor: Colors.white,
      leading: SizedBox.shrink(),
      actions: [
        TextButton(
          onPressed: () {},
          child: Text(
            'Рекомендации',
            style: TextStyle(
              color: widget.id == 0
                  ? Color.fromRGBO(89, 65, 174, 1)
                  : Colors.black,
            ),
          ),
        ),
        TextButton(
          onPressed: () {
            Navigator.pushNamed(context, '/charts');
          },
          child: Text(
            'Аанлитика',
            style: TextStyle(
              color: widget.id == 1
                  ? Color.fromRGBO(89, 65, 174, 1)
                  : Colors.black,
            ),
          ),
        ),
        TextButton(
          onPressed: () {
            Navigator.pushNamed(context, '/subscriptions');
          },
          child: Text(
            'Подписки',
            style: TextStyle(
              color: widget.id == 2
                  ? Color.fromRGBO(89, 65, 174, 1)
                  : Colors.black,
            ),
          ),
        ),
        TextButton(
          onPressed: () {
            Navigator.pushNamed(context, '/profile');
          },
          child: Text(
            'Профиль',
            style: TextStyle(
              color: widget.id == 3
                  ? Color.fromRGBO(89, 65, 174, 1)
                  : Colors.black,
            ),
          ),
        ),
      ],
    );
  }
}
