﻿import UnityEngine;
import System.Collections;

public class TouchController extends MonoBehaviour {

  
  public var wall : GameObject;
  public var rock : GameObject;
  public var Controller : OVRInput.Controller;
  
  public var Player : GameObject;
  public var PlayerHead : Camera;
  public var Hand : String;
  
  public var notificationAudioSource : AudioSource;
  public var notificationSound : AudioClip;

  private var bendingCooldownCounterMax : int = 500;
  private var bendingCooldownCounter : int = 500;
  private var bendingCooldown : boolean = false;

  private var averageHeight1 : int = 0;
  private var averageHeight1Counter : int = 20;
  private var averageHeight2 : int = 0;
  private var averageHeight2Counter : int = 20;
  private var averageHeight3 : int = 0;
  private var averageHeight3Counter : int = 20;

  private var holdingWall : boolean = false;
  private var isMovingDown : boolean = false;
  private var isAboveBool : boolean;
  private var gripping : boolean = false;
  
  private var spawnedWall : GameObject;
  private var distanceFromHead : float;
  private var startingPosition : String = "";
  private var controller_y : int;
  private var controller_vector : Vector3;


  function Awake(){
    notificationAudioSource = GetComponent.<AudioSource> ();
  }
  
  // Update is called once per frame
  function Update() {
    transform.localPosition = OVRInput.GetLocalControllerPosition(Controller);
    transform.localRotation = OVRInput.GetLocalControllerRotation(Controller);

    controller_vector = transform.TransformPoint(transform.position);
    controller_y = controller_vector.y;
   // Debug.Log("controller_y: " + controller_y);

    distanceFromHead = Vector3.Distance (Player.transform.position, transform.position);
    //Debug.Log("distanceFromHead: " + distanceFromHead);
    isAboveBool = isAbove(PlayerHead, Controller);

    updateAverageHeights();

    if (averageHeight1 < averageHeight2 && averageHeight2 < averageHeight3){
      isMovingDown = false;
      Debug.Log("Moving Up");
    } else if (averageHeight1 > averageHeight2 && averageHeight2 > averageHeight3) {
      isMovingDown = true;
      Debug.Log("Moving Down");
    }

    if (bendingCooldown) {
      bendingCooldownCounter--;
      if (bendingCooldownCounter < 0) {
        notificationAudioSource.PlayOneShot(notificationSound, 1f);
        bendingCooldownCounter = bendingCooldownCounterMax;
        bendingCooldown = false;
      }
    }

    if (Input.GetAxis(Hand+"HandTrigger") == 1){
      gripping = true;

      if (isAboveBool){
        startingPosition = "above_head";
      } else {
        startingPosition = "below_head";
      }

      Debug.Log("startingPosition: " + startingPosition);

      handTriggerPull("Hand: " + Hand);
      Debug.Log("spawnedWall.transform.position: " + spawnedWall.transform.position);
    } else {
    	holdingWall = false;
    }


    if (Input.GetAxis(Hand+"HandTrigger") != 1){
      gripping = false;
    }

    if (Input.GetButtonDown("Fire1")) {
    }

  }

  function handTriggerPull(hand : String){

    if (holdingWall){
    //Debug.Log("spawnedWall.transform.position.y " + spawnedWall.transform.position.y );
      //spawnedWall.transform.position.y = OVRInput.GetLocalControllerPosition(Controller).y * 2;
    } else {

      if (!bendingCooldown){

        bendingCooldown = true;


        if (startingPosition == "below_head" && !isMovingDown){
      //  Debug.Log("PlayerHead: " + PlayerHead.transform);
       // Debug.Log("Controller: " + OVRInput.GetLocalControllerPosition(Controller));
          var spawnPointWall : Vector3 = getSpawnPointAlongLine(PlayerHead, Controller, -1.25, 4);
         // Debug.Log("spawnPointWall: "  + spawnPointWall);
          spawnedWall = Instantiate(wall, spawnPointWall, Quaternion.identity) as GameObject;
         // spawnedWall = Instantiate(wall, spawnPointWall, true) as GameObject;
          //spawnedWall.transform.SetParent(transform, false);

          Debug.Log("initial spawnedWall.transform.position: " + spawnedWall.transform.position);
          holdingWall = true;
        }
        
        if (startingPosition == "above_head" && isMovingDown && !isAboveBool){
          var spawnPointRock : Vector3 = getSpawnPointAlongLine(PlayerHead, Controller, -1.25, 2);
          spawnedRock = Instantiate(rock, spawnPointRock, Quaternion.identity) as GameObject;
        }


       

        /*if (startingPosition == "above_head"){
          if (isMovingDown && !isAboveBool){
            Debug.Log("Started above head, moved down to below head");
          }
        } else if (startingPosition == "below_head"){
          if (!isMovingDown && isAboveBool){
            Debug.Log("Started below head, moved up to above head");
          }
        }*/
      }

    }

    }
  

  function updateAverageHeights(){

    if (averageHeight3Counter > 20 && averageHeight1Counter > 20){
      averageHeight1Counter = 0;
    }
    if (averageHeight1Counter > 20 && averageHeight2Counter > 20){
      averageHeight2Counter = 0;
    }
    if (averageHeight2Counter > 20 && averageHeight3Counter > 20){
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
    // Debug.Log("Avg Heights Counters: " + averageHeight1Counter + ", " + averageHeight2Counter + ", " + averageHeight3Counter);

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