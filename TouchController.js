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

  private var wallCooldownCounterMax : int = 500;
  private var wallCooldownCounter : int = 500;
  private var wallCooldown : boolean = false;
  
  private var averageHeight1 : int = 0;
  private var averageHeight1Counter : int = 0;
  private var averageHeight2 : int = 0;
  private var averageHeight2Counter : int = 0;
  private var averageHeight3 : int = 0;
  private var averageHeight2Counter : int = 0;
  
  private var distanceFromHead : float;
  private var isAbove : boolean;
  private var isMovingDown : boolean = false;
  private var gripping : boolean = false;
  private var startingPosition : String = "";

	// Update is called once per frame
  function Update() {
		transform.localPosition = OVRInput.GetLocalControllerPosition(Controller);
		transform.localRotation = OVRInput.GetLocalControllerRotation(Controller);
    
    var controller_y : int = OVRInput.GetLocalControllerPosition(Controller).y;

    distanceFromHead = Vector3.Distance (Player.transform.position, transform.position);
    isAbove = isAbove(PlayerHead, Controller);
    
    updateAverageHeights();
    
    if (averageHeight1 < averageHeight2 && averageHeight2 < averageHeight3){
      isMovingDown = false;
    } else if (averageHeight1 > averageHeight2 && averageHeight2 > averageHeight3) {
      isMovingDown = true;
    }
    Debug.Log("isMovingDown: " + isMovingDown)
    
    
    
    
    
		if (wallCooldown) {
			wallCooldownCounter--;
			if (wallCooldownCounter < 0) {
				wallCooldownCounter = wallCooldownCounterMax;
				wallCooldown = false;
			}
		}

		if (Input.GetAxis(Hand+"HandTrigger") == 1){
      gripping = true;
      
      if (isAbove){
        startingPosition = "above_head";
      } else {
        startingPosition = "below_head";
      }
      
			handTriggerPull("Hand: " + Hand);
		}
    
    if (Input.GetAxis(Hand+"HandTrigger") != 1){
      gripping = false;
		}
    

		if (Input.GetButtonDown("Fire1")) {
		}

	}

	function handTriggerPull(hand : String){
    

    
			//Debug.Log("hand: " + hand + ", distance to player: " + distanceFromHead.toString() + " isAbove: " + isAbove.toString());
			if (!wallCooldown){

				wallCooldown = true;
        
          if (startingPosition == "above_head"){
            if (isMovingDown && !isAbove){
              Debug.Log("Started above head, moved down to below head");
            }
          } else if (startingPosition == "below_head"){
            if (!isMovingDown && isAbove){
              Debug.Log("Started below head, moved up to above head");
            }
          }


          var spawnPointWall : Vector3 = getSpawnPointAlongLine(PlayerHead, Controller, -1.25, 3);
          var createdWall : GameObject = Instantiate(wall, spawnPointWall, Quaternion.identity) as GameObject;

			}

	}
  
  function updateAverageHeights(){
    
    if (averageHeight1Counter == 20 && averageHeight2Counter == 20 &&averageHeight3Counter == 20){
      averageHeight1Counter = 0;
    } else if (averageHeight1Counter == 20){
      averageHeight2Counter = 0;
    } else if (averageHeight1Counter == 20 && averageHeight2Counter == 20){
      averageHeight3Counter = 0;
    }
   
    
    if (averageHeight1Counter == 0){
      averageHeight1 = controller_y;
      averageHeight1Counter++;
    } else if (averageHeight1Counter < 21) {
      averageHeight1 = averageHeight1 * averageHeight1Counter;
      averageHeight1Counter++;
      averageHeight1 += controller_y;
      averageHeight1 = averageHeight1 / averageHeight1Counter;
    } else {
      if (averageHeight2Counter == 0){
        averageHeight2 = controller_y;
        averageHeight2Counter++;
      } else if (averageHeight2Counter < 21) {
        averageHeight2 = averageHeight2 * averageHeight2Counter;
        averageHeight2Counter++;
        averageHeight2 += controller_y;
        averageHeight2 = averageHeight2 / averageHeight2Counter;
      } else {
        if (averageHeight3Counter == 0){
          averageHeight3 = controller_y;
          averageHeight3Counter++;
        } else if (averageHeight3Counter < 21) {
          averageHeight3 = averageHeight3 * averageHeight3Counter;
          averageHeight3Counter++;
          averageHeight3 += controller_y;
          averageHeight3 = averageHeight3 / averageHeight3Counter;
        }
      }
    }
    Debug.Log("Avg Heights: " + averageHeight1 + ", " + averageHeight2 + ", " + averageHeight3);
    
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