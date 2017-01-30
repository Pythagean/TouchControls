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

  private var bendingCooldownCounterMax : int = 500;
  private var bendingCooldownCounter : int = 500;
  private var bendingCooldown : boolean = false;

  private var holdingWall : boolean = false;
  private var spawnedWall : GameObject;
  private var isAboveBool : boolean;



	// Update is called once per frame
  function Update() {
		transform.localPosition = OVRInput.GetLocalControllerPosition(Controller);
		transform.localRotation = OVRInput.GetLocalControllerRotation(Controller);

		isAboveBool = isAbove(PlayerHead, Controller);

		if (bendingCooldown) {
			bendingCooldownCounter--;
			if (bendingCooldownCounter < 0) {
				bendingCooldownCounter = bendingCooldownCounterMax;
				bendingCooldown = false;
			}
		}

		if (Input.GetAxis("LHandTrigger") == 1 && Input.GetAxis("RHandTrigger") == 1){
			bothTriggersPull();
		}


		/*if (Input.GetAxis(Hand+"HandTrigger") == 1){
			handTriggerPull("Hand: " + Hand);
		} else {
			holdingWall = false;
		}*/

		if (Input.GetButtonDown("Fire1")) {
		}

	}

	function bothTriggersPull(){
		if (!bendingCooldown){
			bendingCooldown = true;
			if (!isAbove){
				Debug.Log("TEST");
				PlayerHead.transform.position.y = OVRInput.GetLocalControllerPosition(Controller).y * 2;
			}
		}
	}

	function handTriggerPull(hand : String){

			if (holdingWall){
				spawnedWall.transform.position.y = OVRInput.GetLocalControllerPosition(Controller).y * 2;
			} else {

				if (!bendingCooldown){

					bendingCooldown = true;
					holdingWall = true;

					var distance : float = Vector3.Distance (Player.transform.position, transform.position);


					Debug.Log("isAbove: " + isAbove);

	            	var spawnPointWall : Vector3 = getSpawnPointAlongLine(PlayerHead, Controller, -1.25, 3);
	            	spawnedWall = Instantiate(wall, spawnPointWall, Quaternion.identity) as GameObject;

				}

			}
    
			//Debug.Log("hand: " + hand + ", distance to player: " + distance.toString() + " isAbove: " + isAbove.toString());

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