import UnityEngine;
import System.Collections;

public class TouchController extends MonoBehaviour {

  public var rockSound : AudioClip;
  public var wall : GameObject;
  public var Controller : OVRInput.Controller;
  public var source : AudioSource;
  public var Player : GameObject;
  public var PlayerHead : Camera;

  public var Hand : String;

  private var wallCooldownCounterMax : int = 1000;
  private var wallCooldownCounter : int = 1000;
  private var wallCooldown : boolean = false;



	// Update is called once per frame
  function Update() {
		transform.localPosition = OVRInput.GetLocalControllerPosition(Controller);
		transform.localRotation = OVRInput.GetLocalControllerRotation(Controller);

		if (wallCooldown) {
			wallCooldownCounter--;
			if (wallCooldownCounter < 0) {
				wallCooldownCounter = wallCooldownCounterMax;
				wallCooldown = false;
			}
		}

		if (Input.GetAxis(Hand+"HandTrigger") == 1){
			handTriggerPull("Hand: " + Hand);
		}

		if (Input.GetButtonDown("Fire1")) {
		}

	}

	function handTriggerPull(hand : String){
    

    
			//Debug.Log("hand: " + hand + ", distance to player: " + distance.toString() + " isAbove: " + isAbove.toString());
			if (!wallCooldown){

				wallCooldown = true;

				var distance : float = Vector3.Distance (Player.transform.position, transform.position);
				var isAbove : boolean = isAbove(PlayerHead, Controller);

				Debug.Log("isAbove: " + isAbove);

		        //var dir : Vector3 = Player.transform.position - transform.position;
		        //dir = Player.transform.InverseTransformDirection(dir);
		        //var angle : float = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg;

		       // Debug.Log("transform.position: " + transform.position);

		        //var radius : float = 5f;
		        //var newPointLocation : Vector2 = GetPointOnCircle(transform.position, radius, angle);

            	var spawnPointWall : Vector3 = getSpawnPointAlongLine(PlayerHead, Controller, -1.25, 3);
            	var createdWall : GameObject = Instantiate(wall, spawnPointWall, Quaternion.identity) as GameObject;

			}

	}
  
  function getSpawnPointAlongLine(player : Camera, controller : OVRInput.Controller, height : float, distance : float) {
    var player_x : float = player.transform.position.x;
    var player_z : float = player.transform.position.z;
    var controller_x : float = OVRInput.GetLocalControllerPosition(controller).x;
    var controller_z : float = OVRInput.GetLocalControllerPosition(controller).z;
        
    var new_x : float = (controller_x - player_x) * distance;
    var new_z : float = (controller_z - player_z) * distance;
        
    return new Vector3(new_x, height, new_z);
  }
  
  function isAbove(player : Camera, controller : OVRInput.Controller) {
    var player_y : float = player.transform.position.y;
    var controller_y : float = OVRInput.GetLocalControllerPosition(controller).y;
    return controller_y > player_y;
  }
  
  
   function GetPointOnCircle(origin : Vector2, radius : float , angle : float ) {
 
        var angleInRadians : float = angle * Mathf.Deg2Rad;
 
        var x = origin.x + radius * Mathf.Sin(angleInRadians);
        var y = origin.y + radius * Mathf.Cos(angleInRadians);
 
        return new Vector2(x,y);
 
    }




}