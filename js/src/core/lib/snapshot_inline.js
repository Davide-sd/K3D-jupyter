export default `<div id="canvasTarget_[ID]" class="k3d_plot" style="position: relative;"></div>

<script>
  var K3DInstance;
  var data_[ID] = '[DATA]';

  function loadScript(path, cb) {
    var script = document.createElement('script');
    script.src = path;
    script.onload = cb;
    script.onerror = cb;
    document.head.appendChild(script);
  }

  function loadK3D() {
    function load(lib) {
      function _base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
          bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes;
      }

      try {
        document.getElementById('canvasTarget_[ID]').style.cssText = [
          'height:[HEIGHT]px',
          'position: relative',
        ].join(';');

        K3DInstance = new lib.CreateK3DAndLoadBinarySnapshot(
          _base64ToArrayBuffer(data_[ID]),
          document.getElementById('canvasTarget_[ID]'),
        );

        K3DInstance.then(function (K3DInstance) {
          [ADDITIONAL]
        });
      } catch (e) {
        console.log(e);
        return;
      }
    }

    require(['k3d'],
            load,
            function () {
              loadScript('https://unpkg.com/k3d@[VERSION]/dist/standalone.js', function () {
                try {
                  delete require.s.contexts._.registry.k3d;
                } catch(err) {
                  console.log(err);
                }

                require(['k3d'], load);
              });
            });
  }

  if (typeof (require) === 'undefined') {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js', loadK3D);
  } else {
    loadK3D();
  }
</script>`;