import 'package:flutter/material.dart';

class Footer extends StatelessWidget {
  const Footer({super.key, required this.currentIndex});

  final int currentIndex;

  @override
  Widget build(BuildContext context) {
    if (MediaQuery.of(context).size.width > 768){
      return SizedBox.shrink();
    }
    return Container(
      decoration: BoxDecoration(
        boxShadow: [
          BoxShadow(
            color: Color.fromRGBO(160, 160, 160, 0.3),
            offset: Offset(0, -0.5),
          ),
        ],
      ),
      child: BottomNavigationBar(
        elevation: 0,
        backgroundColor: Colors.white,
        selectedItemColor: Color.fromRGBO(89, 65, 174, 1),
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.ssid_chart),
            label: 'Аналитика',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.subscriptions),
            label: 'Подписки',
          ),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Профиль'),
        ],
        currentIndex: currentIndex,
        onTap: (value) {
          if (value == 0) {
            Navigator.pushNamed(context, '/charts');
          } else if (value == 1) {
            Navigator.pushNamed(context, '/subscriptions');
          }
          if (value == 2) {
            Navigator.pushNamed(context, '/profile');
          }
        },
      ),
    );
  }
}
