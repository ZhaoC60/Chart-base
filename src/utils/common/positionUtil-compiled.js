var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

const Gps = function () {
  function Gps(wgLat, wgLon) {
    _classCallCheck(this, Gps);

    this.wgLat = wgLat;
    this.wgLon = wgLon;
  }

  _createClass(Gps, [{
    key: 'getWgLon',
    value: function getWgLon() {
      return this.wgLon;
    }
  }, {
    key: 'getWgLat',
    value: function getWgLat() {
      return this.wgLat;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.wgLat + ',' + this.wgLon;
    }
  }]);

  return Gps;
}();

var pi = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

/**
 * 坐标转换帮助类
 */

const PositionUtil = function () {
  function PositionUtil() {
    _classCallCheck(this, PositionUtil);
  }

  _createClass(PositionUtil, null, [{
    key: 'outOfChina',
    value: function outOfChina(lat, lon) {
      if (lon < 72.004 || lon > 137.8347) return true;
      if (lat < 0.8293 || lat > 55.8271) return true;
      return false;
    }
  }, {
    key: 'transformLat',
    value: function transformLat(x, y) {
      var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
      ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
      ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
      return ret;
    }
  }, {
    key: 'transformLon',
    value: function transformLon(x, y) {
      var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
      ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
      ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
      return ret;
    }
  }, {
    key: 'gps84ToGcj02',
    value: function gps84ToGcj02(lat, lon) {
      if (PositionUtil.outOfChina(lat, lon)) {
        return null;
      }
      var dLat = PositionUtil.transformLat(lon - 105.0, lat - 35.0);
      var dLon = PositionUtil.transformLon(lon - 105.0, lat - 35.0);
      var radLat = lat / 180.0 * pi;
      var magic = Math.sin(radLat);
      magic = 1 - ee * magic * magic;
      var sqrtMagic = Math.sqrt(magic);
      dLat = dLat * 180.0 / (a * (1 - ee) / (magic * sqrtMagic) * pi);
      dLon = dLon * 180.0 / (a / sqrtMagic * Math.cos(radLat) * pi);
      var mgLat = lat + dLat;
      var mgLon = lon + dLon;
      return new Gps(mgLat, mgLon);
    }
  }, {
    key: 'transform',
    value: function transform(lat, lon) {
      if (PositionUtil.outOfChina(lat, lon)) {
        return new Gps(lat, lon);
      }
      var dLat = PositionUtil.transformLat(lon - 105.0, lat - 35.0);
      var dLon = PositionUtil.transformLon(lon - 105.0, lat - 35.0);
      var radLat = lat / 180.0 * pi;
      var magic = Math.sin(radLat);
      magic = 1 - ee * magic * magic;
      var sqrtMagic = Math.sqrt(magic);
      dLat = dLat * 180.0 / (a * (1 - ee) / (magic * sqrtMagic) * pi);
      dLon = dLon * 180.0 / (a / sqrtMagic * Math.cos(radLat) * pi);
      var mgLat = lat + dLat;
      var mgLon = lon + dLon;
      return new Gps(mgLat, mgLon);
    }
  }, {
    key: 'gcj02ToGps84',
    value: function gcj02ToGps84(lat, lon) {
      var gps = PositionUtil.transform(lat, lon);
      var lontitude = lon * 2 - gps.getWgLon();
      var latitude = lat * 2 - gps.getWgLat();
      return new Gps(latitude, lontitude);
    }
  }]);

  return PositionUtil;
}();

export default PositionUtil